import React from 'react';
import {Rect, Group, Text} from 'react-konva';

var width = window.innerWidth;
var height = window.innerHeight;
var globalFont = 'Arial';
var functionFont = 'Courier New';

var functionStrokeWidth = width / 90;
var functionHalfStrokeWidth = functionStrokeWidth / 2;
var functionTotalSideLength = width / 20;
var functionRectSideLength = functionTotalSideLength - functionStrokeWidth;
var functionColor = '#3FAAA0';
var functionColorLight = '#C6F1ED';
var functionMultColor = '#5EC783';
var functionSingleColor = '#77C9E2';
var functionRGBcolor = '#AE88D6';

var menuFontSize = width/75; //12 when width = 900
var nodeFontSize = width / 56.25; //16 when width = 900
var globalScale = width/900; // for elements that are more difficult to scale (undo/redo)

var imageBoxSideLength = width / 80;
var imageBoxColor = 'white';
var functionImageBoxOffset = width / 300;
var valueImageBoxOffset = width / 31;
var renderSideLength = width / 18;

var functions = {
  add:       {rep: 'sum',   max: 20, min: 2, prefix: 'sum', color: functionMultColor},
  multiply:  {rep: 'mult',   max: 20, min: 2, prefix: 'mult', color: functionMultColor},
  square:    {rep: 'sqr', max: 1, min: 1, prefix: 'square', color: functionSingleColor},
  negate:    {rep: 'neg',   max: 1,  min: 1, prefix: 'neg', color: functionSingleColor},
  sine:      {rep: 'sin', max: 1,  min: 1, prefix: 'sin', color: functionSingleColor},
  cosine:    {rep: 'cos', max: 1,  min: 1, prefix: 'cos', color: functionSingleColor},
  absolute:  {rep: 'abs', max: 1,  min: 1, prefix: 'abs', color: functionSingleColor},
  average:   {rep: 'avg', max: 20, min: 2, prefix: 'avg', color: functionMultColor},
  sign:      {rep: 'sign', max: 1,  min: 1, prefix: 'sign', color: functionSingleColor},
  wrapsum:   {rep: 'wsum', max: 20,  min: 2, prefix: 'wsum', color: functionMultColor},
  rgb:       {rep: 'rgb', max: 3,  min: 3, prefix: 'rgb', color: functionRGBcolor},
  mistif:    {rep: 'if', max: 3, min: 3, prefix: 'mistif', color: functionSingleColor}
}

function MakeFunctionGroup (props) {

  var funName = props.name;
  return <Group
      name={funName}
      x={props.x - functionHalfStrokeWidth}
      y={props.y}
      numInputs={0} 
      maxInputs={functions[funName].max}
      minInputs={functions[funName].min}
      lineOut={[]}
      rep={functions[funName].rep}
      prefix={functions[funName].prefix}
      separator={functions[funName].separator}
      renderFunction={null}
      //visible={false}
      //renderLayer={null}
      scaleX={1}
      scaleY={1}
      draggable
      /*
      dragBoundFunc = {function (pos) {
        var newY = pos.y;
        var newX = pos.x;
        if (pos.y < 0) {
          newY = 0;
        }
        if (pos.y > props.layerHeight) {
          newY = props.layerHeight
        }
        return {
          x: newX,
          y: newY,
        }
      }}
      */
    >
      <Rect
        name={funName}
        x={functionHalfStrokeWidth}
        y={functionHalfStrokeWidth}
        width={functionRectSideLength}
        height={functionRectSideLength}
        fill={functions[funName].color}
        lineJoin={'round'}
        stroke={functions[funName].color}
        strokeWidth={functionStrokeWidth}
      />
      <Text
        text={functions[funName].rep}
        fontFamily={globalFont}
        fill={'black'}
        fontSize={nodeFontSize}
        x={0}
        y={functionTotalSideLength/2 - functionHalfStrokeWidth}
        width={functionTotalSideLength}
        align={'center'}
      />
      <Rect
        name={'imageBox'}
        x={functionRectSideLength + functionImageBoxOffset}
        y={functionRectSideLength + functionImageBoxOffset}
        width={imageBoxSideLength}
        height={imageBoxSideLength}
        fill={imageBoxColor}
        stroke={'black'}
        strokeWidth={.5}
        //visible={false}
        expanded={false}
      />
    </Group>
};

// /* /*
//   makeValueGroup takes a string valName, the name of a key in the values object above,
//   an integer x, and an integer y, and returns the corresponding function node object,
//   centered at (x + width / 40, y + width / 40).
// */
function MakeValueGroup (props) {

  var valName = props.name;
  return <Group
      name={valName}
      x={props.x }
      y={props.y}
      lineOut={[]}
      rep={values[valnName].rep}
      renderFunction={values[valName].rep}
      visible={false}
      renderLayer={null}
      scaleX={1}
      scaleY={1}
      draggable
      onDragStart={props.onDragStart}
      onDragEnd={props.onDragEnd}
    >
      <Rect
        name={valName}
        x={functionRectSideLength/2}
        y={0}
        width={valueSideLength}
        height={valueSideLength}
        fill={values[valName].color}
        rotation={45}
      />
      <Text
        text={values[valName].rep}
        fontFamily={globalFont}
        fill={'black'}
        fontSize={nodeFontSize}
        x={0}
        y={valueSideLength/2}
        width={functionRectSideLength}
        align={'center'}
      />
      <Rect
        name={'imageBox'}
        x={valueImageBoxOffset}
        y={valueImageBoxOffset}
        width={imageBoxSideLength}
        height={imageBoxSideLength}
        fill={imageBoxColor}
        stroke={'black'}
        strokeWidth={.5}
        visible={false}
        expanded={false}
      />
    </Group>
};


export default {height, globalFont, functionFont, functions, functionStrokeWidth,
  functionHalfStrokeWidth, functionTotalSideLength, functionRectSideLength, functionColor, functionColorLight,
  functionMultColor, functionSingleColor, functionRGBcolor, menuFontSize, nodeFontSize, globalScale,
  imageBoxSideLength, imageBoxColor, functionImageBoxOffset, valueImageBoxOffset, renderSideLength,
  MakeFunctionGroup};