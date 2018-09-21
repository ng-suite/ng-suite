const fs = require('fs-extra');
const path = require('path');
const parseDocMdUtil = require('./utils/parse-doc-md');
const parseDemoMdUtil = require('./utils/parse-demo-md');
const nameWithoutSuffixUtil = require('./utils/name-without-suffix');
const generateCodeBox = require('./utils/generate-code-box');
const generateDemo = require('./utils/generate-demo');
// const generateDocs = require('./utils/generate-docs');
const generateRoutes = require('./utils/generate-routes');
// const getMeta = require('./utils/get-meta');

/**
 * 创建文档demo项目组件目录
 * 文档项目路径   ： ../src/app
 * 文档项目demo组件路径： ../src/app/components
 */
const demoRootPath = path.resolve(__dirname, `../src/app`);
const demoComponentsDirPath = `${demoRootPath}/components`;
fs.removeSync(demoComponentsDirPath);
fs.mkdirSync(demoComponentsDirPath);


// package 组件路径
const rootPath = path.resolve(__dirname, '../projects/ng-suite/src');
// 读取components文件夹
const rootDir = fs.readdirSync(rootPath);
const componentsMap = {};
rootDir.forEach(componentName => {
  const componentDirPath = path.join(rootPath, componentName);
  if (componentName === 'style' || componentName === 'core') {
    return;
  }
  if (fs.statSync(componentDirPath).isDirectory()) {
    // 在文档项目当中创建对应demo组件的目录
    const domeComponentPath = path.join(demoComponentsDirPath, componentName);
    fs.mkdirSync(domeComponentPath);

    // 处理components->${component}->demo文件夹
    const demoDirPath = path.join(componentDirPath, 'demo');
    const demoMap = {};
    if (fs.existsSync(demoDirPath)) { // 判断demo文件是否存在（源组件）
      const demoDir = fs.readdirSync(demoDirPath);
      demoDir.forEach(demo => {
        // 处理文档文件
        if (/.md$/.test(demo)) {
          const nameKey = nameWithoutSuffixUtil(demo);
          const demoMarkDownFile = fs.readFileSync(path.join(demoDirPath, demo));
          demoMap[nameKey] = parseDemoMdUtil(demoMarkDownFile);
          demoMap[nameKey]['enCode'] = generateCodeBox(componentName, nameKey, demoMap[nameKey].meta.title["en-US"], demoMap[nameKey].en, demoMap[nameKey].meta.iframe);
          demoMap[nameKey]['zhCode'] = generateCodeBox(componentName, nameKey, demoMap[nameKey].meta.title["zh-CN"], demoMap[nameKey].zh, demoMap[nameKey].meta.iframe);
        }
        // 处理demo
        if (/.ts$/.test(demo)) { 
          const nameKey = nameWithoutSuffixUtil(demo);
          demoMap[nameKey].ts = String(fs.readFileSync(path.join(demoDirPath, demo)));
          // 复制ts文件到文档项目对应的demo组件文件夹
          fs.writeFileSync(path.join(domeComponentPath, demo), demoMap[nameKey].ts);
        }
      });
    }

    // 处理components的doc文件夹
    const result = {
      name   : componentName,
      docZh  : parseDocMdUtil(fs.readFileSync(path.join(componentDirPath, 'doc/index.zh-CN.md')), `projects/ng-suite/src/${componentName}/doc/index.zh-CN.md`),
      docEn  : parseDocMdUtil(fs.readFileSync(path.join(componentDirPath, 'doc/index.en-US.md')), `projects/ng-suite/src/${componentName}/doc/index.en-US.md`),
      demoMap: demoMap
    };
    componentsMap[componentName] = result.docZh.meta;

    generateDemo(domeComponentPath, result);
  }
});

let docsMeta = {};
generateRoutes(demoRootPath, componentsMap, docsMeta);
