import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/docs/__docusaurus/debug',
    component: ComponentCreator('/docs/__docusaurus/debug', 'e58'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/config',
    component: ComponentCreator('/docs/__docusaurus/debug/config', '2ce'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/content',
    component: ComponentCreator('/docs/__docusaurus/debug/content', '11b'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/globalData',
    component: ComponentCreator('/docs/__docusaurus/debug/globalData', 'f13'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/metadata',
    component: ComponentCreator('/docs/__docusaurus/debug/metadata', 'bff'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/registry',
    component: ComponentCreator('/docs/__docusaurus/debug/registry', '830'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/routes',
    component: ComponentCreator('/docs/__docusaurus/debug/routes', '13e'),
    exact: true
  },
  {
    path: '/docs/api/administrative/',
    component: ComponentCreator('/docs/api/administrative/', '2a1'),
    exact: true
  },
  {
    path: '/docs/api/conference/',
    component: ComponentCreator('/docs/api/conference/', '80d'),
    exact: true
  },
  {
    path: '/docs/api/data/',
    component: ComponentCreator('/docs/api/data/', '43d'),
    exact: true
  },
  {
    path: '/docs/blog',
    component: ComponentCreator('/docs/blog', '532'),
    exact: true
  },
  {
    path: '/docs/blog/2024/10/17/first-post',
    component: ComponentCreator('/docs/blog/2024/10/17/first-post', '213'),
    exact: true
  },
  {
    path: '/docs/blog/archive',
    component: ComponentCreator('/docs/blog/archive', '5ff'),
    exact: true
  },
  {
    path: '/docs/blog/authors',
    component: ComponentCreator('/docs/blog/authors', '164'),
    exact: true
  },
  {
    path: '/docs/pages',
    component: ComponentCreator('/docs/pages', '077'),
    routes: [
      {
        path: '/docs/pages',
        component: ComponentCreator('/docs/pages', 'ef4'),
        routes: [
          {
            path: '/docs/pages',
            component: ComponentCreator('/docs/pages', '291'),
            routes: [
              {
                path: '/docs/pages/guide',
                component: ComponentCreator('/docs/pages/guide', '53e'),
                exact: true
              },
              {
                path: '/docs/pages/guide-pt',
                component: ComponentCreator('/docs/pages/guide-pt', 'f66'),
                exact: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/docs/',
    component: ComponentCreator('/docs/', '6fa'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
