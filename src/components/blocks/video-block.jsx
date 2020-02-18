import React, { Component } from "react";
import ReactPlayer from "react-player/lib/players/Vimeo";

class VideoBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { content } = this.props;
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
          <div className="player-wrapper">
            <ReactPlayer
              url={content.url}
              className="react-player"
              playing
              loop
              width="100%"
              height="100%"
              config={{
                vimeo: {
                  playerOptions: {
                    controls: false
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default VideoBlock;
