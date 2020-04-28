(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{152:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return o})),n.d(t,"rightToc",(function(){return p})),n.d(t,"default",(function(){return c}));var r=n(1),i=n(9),a=(n(0),n(170)),l={id:"merge-typedefs",title:"Type definitions (SDL) merging",sidebar_label:"Type definitions (SDL) merging"},o={id:"merge-typedefs",title:"Type definitions (SDL) merging",description:"Originally implemented in [graphql-modules](https://github.com/Urigo/graphql-modules). This tools merged GraphQL type definitions and schema. It aims to merge all possible types, interfaces, enums and unions, without conflicts.",source:"@site/docs/merge-typedefs.md",permalink:"/docs/merge-typedefs",editUrl:"https://github.com/ardatan/graphql-tools/edit/master/website/docs/merge-typedefs.md",sidebar_label:"Type definitions (SDL) merging",sidebar:"someSidebar",previous:{title:"Schema transforms",permalink:"/docs/schema-transforms"},next:{title:"Resolvers merging",permalink:"/docs/merge-resolvers"}},p=[{value:"Usage",id:"usage",children:[{value:"Manually import each type",id:"manually-import-each-type",children:[]},{value:"Import everything from a specified folder",id:"import-everything-from-a-specified-folder",children:[]},{value:"Output the string of typeDefs",id:"output-the-string-of-typedefs",children:[]},{value:"Merging nested Types",id:"merging-nested-types",children:[]},{value:"Merging Directives",id:"merging-directives",children:[]}]}],s={rightToc:p};function c(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"Originally implemented in ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/Urigo/graphql-modules"}),"graphql-modules"),". This tools merged GraphQL type definitions and schema. It aims to merge all possible types, interfaces, enums and unions, without conflicts."),Object(a.b)("h2",{id:"usage"},"Usage"),Object(a.b)("p",null,"Let's say this is your current schema:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-graphql"}),"type Client {\n  id: ID!\n  name: String\n  age: Int\n  products: [Product]\n}\n\ntype Product {\n  id: ID!\n  description: String\n  price: Int\n}\n\ntype Query {\n  clients: [Client]\n  client(id: ID!): Client\n  products: [Product]\n  product(id: ID!): Product\n}\n\ntype Mutation {\n  addClient(name: String!, age: Int!): Client\n}\n")),Object(a.b)("p",null,"Knowing that your app will grow, you want to move your definitions to separate files that should look like the following."),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"// ./graphql/types/clientType.js\nmodule.exports = `\n  type Client {\n    id: ID!\n    name: String\n    age: Int\n    products: [Product]\n  }\n\n  type Query {\n    clients: [Client]\n    client(id: ID!): Client\n  }\n\n  type Mutation {\n    addClient(name: String!, age: Int!): Client\n  }\n`;\n\n// ./graphql/types/productType.js\nmodule.exports =  `\n  type Product {\n    id: ID!\n    description: String\n    price: Int\n    client: Client\n  }\n\n  type Query {\n    products: [Product]\n    product(id: ID!): Product\n  }\n`;\n")),Object(a.b)("p",null,"There are two ways you can use this package:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"manually import each type"),Object(a.b)("li",{parentName:"ul"},"import everything from a specified folder")),Object(a.b)("h3",{id:"manually-import-each-type"},"Manually import each type"),Object(a.b)("p",null,"If you decide to have manual control of each file that gets merged, all you need is the ",Object(a.b)("inlineCode",{parentName:"p"},"mergeTypeDefs(types)")," function from ",Object(a.b)("inlineCode",{parentName:"p"},"@graphql-toolkit/schema-merging")," package."),Object(a.b)("p",null,"Ability to merge a GQL Type defined multiple times in separate files. Will throw an error when fieldDefintitons have conflicting values defined. See ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/okgrow/merge-graphql-schemas/pull/118"}),"PR #118")," for more details."),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"// ./graphql/types/index.js\nconst { mergeTypeDefs } = require('@graphql-toolkit/schema-merging');\nconst clientType = require('./clientType');\nconst productType = require('./productType');\n\nconst types = [\n  clientType,\n  productType,\n];\n\n// NOTE: 2nd param is optional, and defaults to false\n// Only use if you have defined the same type multiple times in\n// different files and wish to attempt merging them together.\nmodule.exports = mergeTypeDefs(types, { all: true });\n")),Object(a.b)("h3",{id:"import-everything-from-a-specified-folder"},"Import everything from a specified folder"),Object(a.b)("p",null,"In this way we use the ",Object(a.b)("inlineCode",{parentName:"p"},"loadFiles")," function from ",Object(a.b)("inlineCode",{parentName:"p"},"@graphql-toolkit/file-loading")," to import all files from the specified folder."),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"// ./graphql/typeDefs.js\nconst path = require('path');\nconst { loadFiles } = require('@graphql-toolkit/file-loading');\nconst { mergeTypeDefs } = require('@graphql-toolkit/schema-merging');\n\nconst typesArray = loadFiles(path.join(__dirname, './types'));\n\nmodule.exports mergeTypeDefs(typesArray, { all: true });\n")),Object(a.b)("p",null,"When using the ",Object(a.b)("inlineCode",{parentName:"p"},"loadFiles")," function you can also implement your type definitions using ",Object(a.b)("inlineCode",{parentName:"p"},".graphql")," or ",Object(a.b)("inlineCode",{parentName:"p"},".gql")," or ",Object(a.b)("inlineCode",{parentName:"p"},".graphqls")," files."),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},"The ",Object(a.b)("inlineCode",{parentName:"p"},"loadFiles")," function will by default ignore files named ",Object(a.b)("inlineCode",{parentName:"p"},"index.js")," or ",Object(a.b)("inlineCode",{parentName:"p"},"index.ts")," (use ",Object(a.b)("inlineCode",{parentName:"p"},"{ignoreIndex: false}")," option to change this behavior). This allows you to create your index file inside the actual types folder if desired.")),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-graphql"}),"# ./graphql/types/clientType.graphql\ntype Client {\n  id: ID!\n  name: String\n  age: Int\n  products: [Product]\n}\n\ntype Query {\n  clients: [Client]\n  client(id: ID!): Client\n}\n\ntype Mutation {\n  addClient(name: String!, age: Int!): Client\n}\n\n# ./graphql/types/productType.graphql\ntype Product {\n  id: ID!\n  description: String\n  price: Int\n  client: Client\n}\n\ntype Query {\n  products: [Product]\n  product(id: ID!): Product\n}\n")),Object(a.b)("p",null,"You can also load files in nested folders by setting the ",Object(a.b)("inlineCode",{parentName:"p"},"recursive")," option."),Object(a.b)("p",null,"Given the file structure below:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{}),"+-- graphql\n|   +-- types\n|   |   +-- subGroupA\n|   |   |   +-- typeA1.graphql\n|   |   |   +-- typeA2.graphql\n|   |   +-- subGroupB\n|   |   |   +-- typeB1.graphql\n|   |   |   +-- typeB2.graphql\n|   |   +-- index.js\n")),Object(a.b)("p",null,"Here's how your ",Object(a.b)("inlineCode",{parentName:"p"},"index")," file could look like:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"const path = require('path');\nconst { loadFiles } = require('@graphql-toolkit/file-loading');\nconst { mergeTypeDefs } = require('@graphql-toolkit/schema-merging');\n\nconst typesArray = loadFiles(path.join(__dirname, '.'), { recursive: true })\n\nmodule.exports = mergeTypeDefs(typesArray, { all: true })\n")),Object(a.b)("p",null,"You can also load files in different folders by passing a glob pattern in ",Object(a.b)("inlineCode",{parentName:"p"},"loadFiles"),"."),Object(a.b)("p",null,"Given the file structure below:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{}),"+-- graphql\n|   +-- subGroupA\n|   |   +-- typeA1.graphql\n|   |   +-- typeA2.graphql\n|   +-- subGroupB\n|   |   +-- typeB1.graphql\n|   |   +-- typeB2.graphql\n|   +-- index.js\n")),Object(a.b)("p",null,"Here's how your ",Object(a.b)("inlineCode",{parentName:"p"},"index")," file could look like:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"const path = require('path');\nconst { loadFiles } = require('@graphql-toolkit/file-loading');\nconst { mergeTypeDefs } = require('@graphql-toolkit/schema-merging');\n\nconst typesArray = loadFiles(path.join(__dirname, 'graphql/**/*.graphql'))\n\nmodule.exports = mergeTypeDefs(typesArray, { all: true })\n")),Object(a.b)("h3",{id:"output-the-string-of-typedefs"},"Output the string of typeDefs"),Object(a.b)("p",null,"Since the output of ",Object(a.b)("inlineCode",{parentName:"p"},"mergeTypeDefs")," is just a string, after you merge your types, you can save it to a file to be passed around to other systems. Here is an example using ES6 modules:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"const { loadFiles } = require('@graphql-toolkit/file-loading');\nconst { mergeTypeDefs } = require('@graphql-toolkit/schema-merging');\nconst fs = require('fs');\n\nconst typeDefs = mergeTypeDefs(loadFiles(`${__dirname}/schema/**/*.graphql`), { all: true });\nfs.writeFileSync('joined.graphql', typeDefs);\n")),Object(a.b)("h3",{id:"merging-nested-types"},"Merging nested Types"),Object(a.b)("p",null,"The ",Object(a.b)("inlineCode",{parentName:"p"},"mergeTypeDefs")," function also allows merging multiple schemas. In the situations where you would like to have multiple\ntypes subfolders, you can merge your types on each subfolder and then everything into one single schema. See the example below:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{}),"+-- graphql\n|   +-- types\n|   |   +-- subGroupA\n|   |   |   +-- index.js <<< Merges all types in subGroupA\n|   |   |   +-- typeA1.graphql\n|   |   |   +-- typeA2.graphql\n|   |   +-- subGroupB\n|   |   |   +-- index.js <<< Merges all types in subGroupB\n|   |   |   +-- typeB1.graphql\n|   |   |   +-- typeB2.graphql\n|   |   +-- index.js <<< Merges exports from subGroupA and subGroupB\n")),Object(a.b)("h3",{id:"merging-directives"},"Merging Directives"),Object(a.b)("p",null,"Directives will be stacked on top of each other, in the order of declaration."),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"type Query {\n  client: Client @foo\n}\ntype Query {\n  client: Client @bar\n}\n")),Object(a.b)("p",null,"Becomes"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{}),"type Query {\n  client: Client @foo @bar\n}\n")))}c.isMDXComponent=!0},170:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return g}));var r=n(0),i=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=i.a.createContext({}),c=function(e){var t=i.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o({},t,{},e)),n},u=function(e){var t=c(e.components);return i.a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},b=Object(r.forwardRef)((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),u=c(n),b=r,g=u["".concat(l,".").concat(b)]||u[b]||d[b]||a;return n?i.a.createElement(g,o({ref:t},s,{components:n})):i.a.createElement(g,o({ref:t},s))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,l=new Array(a);l[0]=b;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var s=2;s<a;s++)l[s]=n[s];return i.a.createElement.apply(null,l)}return i.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);