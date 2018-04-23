import React from "react";
import { createDevTools } from "redux-devtools";
import LogMonitor from "redux-devtools-log-monitor";
import DockMonitor from "redux-devtools-dock-monitor";

const toggleVisibilityKey = "ctrl-h";
const changePositionKey = "ctrl-q";

// createDevTools takes a monitor and produces a DevTools component
const DevTools = createDevTools(
  // Monitors are individually adjustable with props.
  // Consult their repositories to learn about those props.
  // Here, we put LogMonitor inside a DockMonitor.
  // Note: DockMonitor is visible by default.
  <DockMonitor
    toggleVisibilityKey={toggleVisibilityKey}
    changePositionKey={changePositionKey}
    defaultIsVisible={false}
  >
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
);

DevTools.toggleVisibilityKey = toggleVisibilityKey;
DevTools.changePositionKey = changePositionKey;

export default DevTools;
