export const ROUTER_LIST = {
  'intro'     : [],
  'components': [
  {
    "name": "Layout",
    "children": [
      {
        "label": "Grid",
        "path": "components/grid/zh",
        "zh": "栅格",
        "language": "zh"
      },
      {
        "label": "Grid",
        "path": "components/grid/en",
        "zh": "",
        "language": "en"
      }
    ]
  }
]
};
export const DEMO_ROUTES = [
  {'path': 'components/grid', 'loadChildren': './components/grid/index.module#NsDemoGridModule'},

];
