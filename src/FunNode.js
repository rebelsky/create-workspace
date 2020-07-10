import React, { useState } from "react";
import { Rect, Group, Text, Shape, Image } from "react-konva";
import Konva from 'konva';
import Portal from './Portal';
import gui from './mistgui-globals.js';
import MISTImage from './MISTImage';
import useImage from 'use-image';

/**
 * 
 * @param props 
 */
function FunNode(props) {
    const name = props.name;
    const index = props.index;
    const x = props.x;
    const y = props.y;
    const numInputs = props.numInputs;
    const maxInputs = gui.functions[name].max;
	const minInputs = gui.functions[name].min;
    const [lineOut, setLineOut] = useState([]);
    const rep = gui.functions[name].rep;
    const prefix = gui.functions[name].prefix;
    const separator = gui.functions[name].separator;
    const renderFunction = props.findRF(index);
    const numOutlets = props.numOutlets;
    const [showImage, setShowImage] = useState(false);
    const [image, setImage] = useState(null);
    const [mainRectState, setMainRectState] = useState('none');
    const [hovered, setHovered] = useState(false);
    const [trashHovered, setTrashHovered] = useState(false);
    
    function Trashcan() {
        return <Image
          image={image}
          x={props.sourceX + (props.sinkX - props.sourceX) * (3/5) - 7}
          y={props.sourceY + (props.sinkY - props.sourceY) * (3/5) - 7}
          width={14} height={14}
          shadowColor={trashHovered ? "red" : "cyan"}
          shadowBlur={5}
          visible={hovered}
          onMouseEnter={() => {
            setTrashHovered(true);
          }}
          onMouseLeave={() => {
            setTrashHovered(false);
            setHovered(false);
          }}
          onClick={() => props.removeLine(props.index)}
        />;
      }

    function handleDragStart(e) {
        e.target.setAttrs({
          shadowOffset: {
            x: 15,
            y: 15
            },
            scaleX: 1.1,
            scaleY: 1.1
        });
    }
    
    function handleDragEnd(e) {
        e.target.to({
            duration: 0.5,
            easing: Konva.Easings.ElasticEaseOut,
            scaleX: 1,
            scaleY: 1,
            shadowOffsetX: 5,
            shadowOffsetY: 5
        });
    }

    function handleDrag(e) {
        props.handler(index, e.currentTarget.x(), e.currentTarget.y())
    }

    function handleClick(e) {
        if(e.target.attrs.name) {
            props.outletClicked(index, parseInt(e.target.attrs.name.substring(6))-1);
        }
        else { props.funClicked(index); }
    }

    function handleDblClick(e) {
        props.dblClickHandler(index);
    }

    function outletHovered(e) {
        e.target.to({
            duration: 0.3,
            easing: Konva.Easings.ElasticEaseOut,
            scaleX: 1.2,
            scaleY: 1.2,
            shadowOffsetX: 5,
            shadowOffsetY: 5
        });
    }

    function outletExited(e) {
        e.target.to({
            duration: 0.3,
            easing: Konva.Easings.ElasticEaseOut,
            scaleX: 1,
            scaleY: 1,
            shadowOffsetX: 5,
            shadowOffsetY: 5
        });
    }

    function rectHovered(e) {
        e.target.to({
            duration: 0.2,
            easing: Konva.Easings.ElasticEaseInOut,
            scaleX: 1.05,
            scaleY: 1.05
        });
    }

    function rectExited(e) {
        e.target.to({
            duration: 0.2,
            easing: Konva.Easings.ElasticEaseInOut,
            scaleX: 1,
            scaleY: 1
        });
    }

    return (
        <Group
            draggable
            dragBoundFunc={function(pos) {
                if(pos.x < 10) {
                    return {y:pos.y, x:0};
                }
                else if(pos.x > window.innerWidth - 10) {
                    return {y:pos.y, x:window.innerWidth}
                }
                else if(pos.y < 10) {
                    return {x:pos.x, y:0}
                }
                else if(pos.y > window.innerHeight - 10) {
                    return {x:pos.x, y:window.innerHeight}
                }
                else { return pos }
            }}
            onDragStart={handleDragStart} onDragEnd={handleDragEnd}
            onDragMove={handleDrag} onClick={handleClick}
            onDblClick={handleDblClick}
            x={x}
            y={y}
        >
            <Rect
                name={"mainRect"}
                x={gui.functionHalfStrokeWidth}
                y={gui.functionHalfStrokeWidth}
                width={gui.functionRectSideLength}
                height={(props.numOutlets <= 3)
                    ? gui.functionRectSideLength
                    : gui.functionRectSideLength +
                    (props.numOutlets - 3) * gui.outletYOffset}
                fill={gui.functions[name].color}
                lineJoin={'round'}
                stroke={gui.functions[name].color}
                strokeWidth={gui.functionStrokeWidth}
                shadowColor={!hovered && "gray" || trashHovered && "red" || (hovered && !trashHovered) && "cyan"}
                shadowBlur = {3}
                shadowOffsetX={!hovered ? 1 : 0}
                shadowOffsetY={!hovered ? 1 : 0}
                onMouseEnter={(e) => {
                    if(e.target.attrs.name && e.target.attrs.name.substring(0, 1) === "m") {
                        setHovered(true);
                        rectHovered(e);
                    }
                }}
                onMouseLeave={(e) => {
                    if(e.target.attrs.name && e.target.attrs.name.substring(0, 1) === "m") {
                        setHovered(false);
                        rectExited(e);
                    }
                }}
            />
            {/*<Trashcan/>*/}
            <Text
                text={rep}
                fontFamily={gui.globalFont}
                fill={'black'}
                fontSize={gui.nodeFontSize}
                x={0}
                y={(props.numOutlets <= 3)
                    ? gui.functionTotalSideLength / 2 - gui.functionHalfStrokeWidth
                    : (gui.functionTotalSideLength + (props.numOutlets - 3) * gui.outletYOffset) / 2 -
                    gui.functionHalfStrokeWidth}
                width={gui.functionTotalSideLength}
                align={'center'}
                _useStrictMode
            />
            {showImage 
                ? <Portal>
                    <MISTImage
                        onClick={() => setShowImage(!showImage)}
                        x={x + gui.functionRectSideLength + gui.functionImageBoxOffset}
                        y={y + gui.functionRectSideLength + gui.functionImageBoxOffset}
                        width={gui.renderSideLength}
                        height={gui.renderSideLength}
                        renderFunction={renderFunction}
                    />
                </Portal>
                : <Rect
                    onClick={() => setShowImage(!showImage)}
                    name={'imageBox'}
                    x={gui.functionRectSideLength + gui.functionImageBoxOffset}
                    y={(props.numOutlets <= 3)
                        ? gui.functionRectSideLength + gui.functionImageBoxOffset
                        : gui.functionRectSideLength + gui.functionImageBoxOffset +
                        (props.numOutlets - 3) * gui.outletYOffset}
                    width={gui.imageBoxSideLength}
                    height={gui.imageBoxSideLength}
                    fill={gui.imageBoxColor}
                    shadowColor={"gray"}
                    shadowBlur={2}
                    shadowOffsetX={1}
                    shadowOffsetY={1}
                    expanded={false}
                />
            }
            {(name === "rgb")
            ? ["red", "green", "blue"].map((u, i) =>
                <Shape
                    sceneFunc={function (context) {
                    context.beginPath();
                    context.moveTo(0, 0);
                    context.bezierCurveTo(-gui.bezPoint, -gui.bezPoint, -gui.bezPoint, gui.bezPoint, 0, 0);
                    context.closePath();
                    context.fillStrokeShape(this);
                    }}
                    name = {'outlet' + (i+1)}
                    x = {gui.outletXOffset}
                    y = {(i) * gui.outletYOffset + 17}
                    fillRadialGradientStartPoint={{ x: -19, y: -5 }}
                    fillRadialGradientStartRadius={3}
                    fillRadialGradientEndPoint={{ x: -15, y: -5 }}
                    fillRadialGradientEndRadius={15}
                    fillRadialGradientColorStops={[0, u, 1, 'dark'+u]}
                    //fill={u}
                    shadowColor={"gray"}
                    shadowBlur={2}
                    opacity={1}
                    lineIn={null}
                    outletIndex={i}
                    onMouseOver={(e) => {
                        if(e.target.attrs.name && e.target.attrs.name.substring(0, 1) === "o") {
                            outletHovered(e);
                        }
                    }}
                    onMouseOut={(e) => {
                        if(e.target.attrs.name && e.target.attrs.name.substring(0, 1) === "o") {
                            outletExited(e);
                        }
                    }}
                />
            )
            : [...Array(numOutlets)].map((u, i) =>
                <Shape
                    sceneFunc={function (context) {
                    context.beginPath();
                    context.moveTo(0, 0);
                    context.bezierCurveTo(-gui.bezPoint, -gui.bezPoint, -gui.bezPoint, gui.bezPoint, 0, 0);
                    context.closePath();
                    context.fillStrokeShape(this);
                    }}
                    name = {'outlet' + (i+1)}
                    x = {gui.outletXOffset}
                    y = {(i) * gui.outletYOffset + 17}
                    fillRadialGradientStartPoint={{ x: -19, y: -5 }}
                    fillRadialGradientStartRadius={3}
                    fillRadialGradientEndPoint={{ x: -15, y: -5 }}
                    fillRadialGradientEndRadius={15}
                    fillRadialGradientColorStops={[0, gui.outletColor, 1, gui.outletColor2]}
                    //fill={gui.outletColor}
                    //shadowColor={"gray"}
                    //shadowBlur={2}
                    opacity={1}
                    lineIn={null}
                    outletIndex={i}
                    onMouseOver={(e) => {
                        if(e.target.attrs.name && e.target.attrs.name.substring(0, 1) === "o") {
                            outletHovered(e);
                        }
                    }}
                    onMouseOut={(e) => {
                        if(e.target.attrs.name && e.target.attrs.name.substring(0, 1) === "o") {
                            outletExited(e);
                        }
                    }}
                />
            )}
        </Group>
    );
}
export default FunNode;
