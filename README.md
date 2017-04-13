# svg-json-parser

this App imports SVG Element in webpack boulne.js file.


```html
npm install svgpack-loader;

var lib = require("svgpack!./svgmap.json");
```
<h6> svgmap.json </h6>
```html
{
"folder":"./files/lib", // folder direction
"lib":["./site/lib.svg"], //svg librarys
"costum":{"html":"./files/lib/abc.svg"} // single import with costum name
}
```
<h6>converted Object</h6>
```html
{
  node:"svg",
  id:"svglib",
  children:[
    {"node":"g",id:apple,children:[{node:"path",attr:{d:"M10..",fill="red"}},.....]},
    {"node":"path",id:orange,attr:{fill="#FF3456"}},
    .....
  ]
}
```
<h6>you can use lib object in react:</h6>

```html
class Icon extends React.Component {
  render(){
    var s = svglib[this.props.id];
    if(s.node=="g"){return (<g >{sv.children.map((e,i)=><path  d={e.d} fill={e.fill} key={i} ></path>)}</g>);}
    else if(s.node=="path"){return (<path  d={s.d} fill={s.fill} ></path>);}
  }
}
<Icon id='work' />
```
