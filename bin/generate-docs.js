const fs = require('fs-extra');
const path = require('path');
const parseDocMdUtil = require('./utils/parse-doc-md');
const parseDemoMdUtil = require('./utils/parse-demo-md');
const nameWithoutSuffixUtil = require('./utils/name-without-suffix');
const generateCodeBox = require('./utils/generate-code-box');
const generateDemo = require('./utils/generate-demo');
const generateDocs = require('./utils/generate-docs');
const generateRoutes = require('./utils/generate-routes');
const getMeta = require('./utils/get-meta');

// 根目录路径
const rootPath = path.resolve(__dirname, `../src/app`);
// 组件文件夹路径
const componentsDirPath = `${rootPath}/components`;
// 创建组件文件夹
fs.removeSync(componentsDirPath);
fs.mkdirSync(componentsDirPath);


// 读取components文件夹
const sourceComponentsDirPath = path.resolve(__dirname, '../projects/ng-suite/src');
const sourceComponentsDir = fs.readdirSync(sourceComponentsDirPath);
const componentsMap = {};
sourceComponentsDir.forEach(componentName => {
  const componentDirPath = path.join(rootPath, componentName);
  if (componentName === 'style') {
    return;
  }
  if (fs.statSync(componentDirPath).isDirectory()) {
    // 创建site->${component}文件夹
    const showCaseComponentPath = path.join(componentsDirPath, componentName);
    fs.mkdirSync(showCaseComponentPath);

    // 处理components->${component}->demo文件夹
    const demoDirPath = path.join(componentDirPath, 'demo');
    const demoMap = {};
    if (fs.existsSync(demoDirPath)) {
      const demoDir = fs.readdirSync(demoDirPath);
      demoDir.forEach(demo => {

        if (/.md$/.test(demo)) {
          const nameKey = nameWithoutSuffixUtil(demo);
          const demoMarkDownFile = fs.readFileSync(path.join(demoDirPath, demo));
          demoMap[nameKey] = parseDemoMdUtil(demoMarkDownFile);
          demoMap[nameKey]['enCode'] = generateCodeBox(componentName, nameKey, demoMap[nameKey].meta.title["en-US"], demoMap[nameKey].en, demoMap[nameKey].meta.iframe);
          demoMap[nameKey]['zhCode'] = generateCodeBox(componentName, nameKey, demoMap[nameKey].meta.title["zh-CN"], demoMap[nameKey].zh, demoMap[nameKey].meta.iframe);
        }
        if (/.ts$/.test(demo)) {
          const nameKey = nameWithoutSuffixUtil(demo);
          demoMap[nameKey].ts = String(fs.readFileSync(path.join(demoDirPath, demo)));
          // 复制ts文件到site->${component}文件夹
          fs.writeFileSync(path.join(showCaseComponentPath, demo), demoMap[nameKey].ts);
        }
      });
    }
    // 处理components->${component}->doc文件夹
    const result = {
      name   : componentName,
      docZh  : parseDocMdUtil(fs.readFileSync(path.join(componentDirPath, 'doc/index.zh-CN.md')), `projects/ng-suite/src/${componentName}/doc/index.zh-CN.md`),
      docEn  : parseDocMdUtil(fs.readFileSync(path.join(componentDirPath, 'doc/index.en-US.md')), `projects/ng-suite/src/${componentName}/doc/index.en-US.md`),
      demoMap: demoMap
    };
    componentsMap[componentName] = result.docZh.meta;

    generateDemo(showCaseComponentPath, result);
  }
});