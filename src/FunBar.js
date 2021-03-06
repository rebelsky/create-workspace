import React, { useState } from "react";
import { Rect, Group, Text, Shape, useStrictMode } from "react-konva";
import Konva from "konva";
import Portal from "./Portal";
import gui from "./mistgui-globals.js";
import MISTImage from "./MISTImage";
import "./styles/FunBar.css";
import { Spring, animated } from "react-spring/renderprops-konva";

function FunBar(props) {
  const [imageButtonClicked, setImageButtonClicked] = useState(false);
  const [imageButtonHovered, setImageButtonHovered] = useState(false);
  const [functionButtonHovered, setFunctionButtonHovered] = useState(false);

  return (
    <Group x={0} y={gui.height - gui.funBarHeight}>
      <Rect
        x={0}
        y={0}
        width={gui.funBarWidth}
        height={gui.funBarHeight}
        fill={props.bg}
      />
      <Rect
        x={gui.funBarOffset}
        y={gui.funBarOffset}
        width={gui.funBarTextAreaWidth}
        height={gui.funBarTextAreaHeight}
        fill={"white"}
      />
      <Text
        text={props.renderFunction.renderFunction}
        x={gui.funBarTextOffset}
        y={gui.funBarTextOffset}
        width={gui.funBarTextAreaWidth - gui.funBarTextOffset}
        height={gui.funBarTextAreaHeight - 2 * gui.funBarOffset}
        fill={"black"}
        fontFamily={"Courier New"}
        fontSize={gui.funBarDisplayFontSize}
      />
      <Text
        text={"Save as..."}
        x={gui.funBarTextAreaWidth + 2 * gui.funBarOffset}
        y={gui.funBarHeight / 2 - gui.funBarFontSize / 2}
        width={gui.funBarWidth * (3 / 25)}
        fill={"white"}
        fontSize={gui.funBarFontSize}
      />
      <Group
        x={
          gui.funBarTextAreaWidth +
          gui.funBarWidth * (2 / 25) +
          gui.funBarOffset
        }
        y={gui.funBarOffset}
      >
        <Spring
          native
          from={{ fill: !functionButtonHovered ? "white" : "#f37121" }}
          to={{ fill: functionButtonHovered ? "white" : "#f37121" }}
        >
          {(props) => (
            <animated.Rect
              {...props}
              x={0}
              y={0}
              width={gui.funBarIconTextWidth}
              height={gui.funBarTextAreaHeight}
              stroke={"#424874"}
              cornerRadius={8}
            />
          )}
        </Spring>
        <Text
          text={"Function"}
          x={0}
          y={gui.funBarOffset}
          width={gui.funBarIconTextWidth}
          height={gui.funBarTextAreaHeight}
          align={"center"}
          fill={!functionButtonHovered ? "white" : "grey"}
          fontSize={gui.funBarFontSize}
          onMouseOver={() => {
            setFunctionButtonHovered(true);
          }}
          onMouseOut={() => {
            setFunctionButtonHovered(false);
          }}
        />
      </Group>
      <Group
        x={
          gui.funBarTextAreaWidth +
          gui.funBarWidth * (2 / 25) +
          gui.funBarOffset +
          gui.funBarIconTextWidth +
          2 * gui.funBarOffset
        }
        y={gui.funBarOffset}
      >
        <Rect
          x={0}
          y={0}
          width={gui.funBarIconTextWidth}
          height={gui.funBarTextAreaHeight}
          fill={gui.valueMenuColorLight}
          //shadowColor={'black'}
          shadowBlur={2}
          shadowOffsetX={1}
          shadowOffsetY={1}
          shadowColor={"black"}
          cornerRadius={8}
        />
        {imageButtonClicked ? ( //temp; remove ! later
          <Portal>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: gui.width,
                height: gui.height,
                backgroundColor: "black",
                opacity: 0.7,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0.5 * gui.popSaveGroupY,
                left: gui.popSaveGroupX,
                width: gui.popRectWidth,
                height: gui.popRectHeight,
                borderRadius: 25,
                backgroundColor: gui.popRectColor,
              }}
            />
            <MISTImage
              x={gui.popCanvasShiftX}
              y={gui.popCanvasShiftY}
              width={gui.popCanvasSide}
              height={gui.popCanvasSide}
              renderFunction={props.renderFunction.renderFunction}
            />
            <div
              style={{
                position: "absolute",
                top: gui.popTextShiftY,
                left: gui.popSaveGroupX + gui.popTextShiftX,
                fontSize: gui.popTextFontSize,
                fontFamily: gui.functionFont,
                textAlign: "center",
                width: gui.popTextWidth,
                height: gui.popTextHeight,
                overflow: "auto",
              }}
            >
              <p>{props.renderFunction.renderFunction}</p>
            </div>
            <div
              style={{
                position: "absolute",
                top: 0.8 * gui.popSaveGroupY,
                left: gui.popTextShiftX + gui.popSaveGroupX,
                fontSize: gui.popTextFontSize,
                fontFamily: gui.functionFont,
                width: gui.popTextWidth,
                height: gui.popTextHeight,
                textAlign: "center",
              }}
            >
              <form>
                <input
                  type={"text"}
                  placeholder={"Enter Name Of Image"}
                  style={{
                    width: 0.7 * gui.popTextWidth,
                    height: 0.7 * gui.popTextHeight,
                    border: "2px solid #008CBA",
                  }}
                />
              </form>
            </div>
            <div
              style={{
                position: "absolute",
                top:
                  gui.popSaveGroupY + gui.popCanvasSide + gui.popTextHeight * 2,
                left: gui.popTextShiftX + gui.popSaveGroupX,
                fontSize: gui.popTextFontSize,
                fontFamily: gui.functionFont,
                width: gui.popTextWidth,
                height: gui.popTextHeight,
                textAlign: "center",
              }}
            >
              {["Cancel", "Download", "Save"].map((u, i) => {
                return (
                  <button
                    class="button button2"
                    onClick={() => {
                      if (u === "Cancel") {
                        setImageButtonClicked(false);
                      }
                    }}
                  >
                    {u}
                  </button>
                );
              })}
            </div>
          </Portal>
        ) : (
          <Text
            text={"Image"}
            x={0}
            y={gui.funBarOffset}
            width={gui.funBarIconTextWidth}
            align={"center"}
            fill={imageButtonHovered ? "gray" : "white"}
            fontSize={gui.funBarFontSize}
            onClick={() => {
              if (props.renderFunction.isRenderable) {
                setImageButtonClicked(true);
              }
            }}
            onMouseOver={() => {
              setImageButtonHovered(true);
            }}
            onMouseOut={() => {
              setImageButtonHovered(false);
            }}
          />
        )}
      </Group>
    </Group>
  );
}

export default FunBar;
