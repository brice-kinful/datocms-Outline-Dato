import React, { Component } from "react";
import ReactPlayer from "react-player/lib/players/Vimeo";
import handleViewport from "react-in-viewport";

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { content, enterCount } = this.props;
    return (
      <div
        className={`block video-block${
          content.doubleTopPadding ? " pad-top" : ""
        }${content.doubleBottomPadding ? " pad-bottom" : ""}${
          content.setBottomPaddingToZero ? " no-pad-bottom" : ""
        }${content.setTopPaddingToZero ? " no-pad-top" : ""}`}
        style={{ backgroundColor: content.backgroundColor?.hex }}
      >
        <div className="wrapper centertext skinny">
          <div className={`player-wrapper blur ${enterCount > 0 && "loaded"}`}>
            <ReactPlayer
              url={content.vimeoVideo?.url}
              className="react-player"
              playing
              loop
              width="100%"
              height="100%"
              config={{ vimeo: { playerOptions: { background: true } } }}
            />
          </div>
        </div>
      </div>
    );
  }
}

const VideoBlock = handleViewport(Video, { rootMargin: "-1.0px" });

export default VideoBlock;
