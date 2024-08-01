window.videojs = videojs;
const video = "tears_of_steel";
const url = `assets/videos/${video}/stream_data/manifest.mpd`;

function bitrateSelector(player, logger) {
  const streamOptions = [];
  const qualityLevels = player.qualityLevels();
  let selectedStreamOption = null;

  function updateStreamBitrate(optionId) {
    qualityLevels.levels_.forEach((item, idx) => {
      if (idx === optionId) item.enabled = true;
      else item.enabled = false;
    });

    selectedStreamOption = optionId;

    qualityLevels.levels_.forEach((item, idx) => {
      if (item.enabled && logger) console.log(item.bitrate, "=>", item.enabled);
    });
  }

  function getStreamBitrateOptionIndex(height) {
    const bitrateOptionIndex = streamOptions.findIndex(
      (option) => option.height == height
    );
    if (logger) console.warn("selectedBitrateOption", bitrateOptionIndex);

    return bitrateOptionIndex;
  }

  function createQualitySelectorMenu(streamOptions) {
    var qualityMenuButton = player.controlBar.addChild("MenuButton", {
      text: "Quality",
      button: true,
    });

    var qualityMenu = qualityMenuButton.addChild("Menu");

    for (let i = 0; i < streamOptions.length; i++) {
      const qualityOption = streamOptions[i];
      const menuItem = qualityMenu.addChild("MenuItem", {
        label: `${qualityOption.height}p`,
      });

      menuItem.addClass(`quality-${qualityOption.label}`);
      menuItem.on("click", function (e) {
        const option = getStreamBitrateOptionIndex(
          e.target.innerText.replace("p", "")
        );
        updateStreamBitrate(option);

        qualityMenu.addClass("vjs-hidden");
        setTimeout(() => {
          qualityMenu.removeClass("vjs-hidden");
        }, 100);
      });
    }
  }

  qualityLevels.on("addqualitylevel", function (qlevent) {
    const qualityLevel = qlevent.qualityLevel;
    if (logger)
      console.info(`Found Bitrate Option=> ${qualityLevel.bitrate / 1000}kbps`);

    streamOptions.push({
      bitrate: qualityLevel.bitrate,
      height: qualityLevel.height,
      width: qualityLevel.width,
    });
  });

  qualityLevels.on("change", function (qlchangeevent) {
    if (selectedStreamOption !== null) return;
    if (logger) console.warn("Video Initial Bitrate", streamOptions[0].bitrate);

    createQualitySelectorMenu(streamOptions);
    updateStreamBitrate(0);
  });
}

try {
  const player = videojs("video-player", {
    controls: true,
    playbackRates: [0.5, 1, 1.5, 2],
    controlBar: {
      audioTrackButton: false,
      subsCapsButton: false,
    },
    autoplay: false,
    qualityLevels: {},
  });

  player.src({ src: url, type: "application/dash+xml" });

  player.ready(function (e) {
    bitrateSelector(player, true);
  });
} catch (error) {
  console.log("error creating player", error);
}
