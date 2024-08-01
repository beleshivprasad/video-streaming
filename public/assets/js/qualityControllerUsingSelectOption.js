window.videojs = videojs;
const video = "tears_of_steel";
const url = `assets/videos/${video}/stream_data/manifest.mpd`;

function bitrateSelector(player, logger, containerId = null) {
  const streamOptions = [];
  const qualityLevels = player.qualityLevels();
  let selectedStreamOption = null;

  player.on("play", function () {
    const qualitySelectorContainer = document.getElementById(containerId);

    // saving select returned by createQualitySelect
    select = createQualitySelect();

    if (!qualitySelectorContainer.childElementCount)
      qualitySelectorContainer.appendChild(select);
  });

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

  function createQualitySelect() {
    const select = document.createElement("select");
    select.setAttribute("id", "bitrate-select");
    select.addEventListener("change", function (e) {
      const option = getStreamBitrateOptionIndex(e.target.value);
      updateStreamBitrate(option);
    });

    return select;
  }

  function createQualitySelectOption(qualityLevel, parent) {
    const option = document.createElement("option");
    const optionText = document.createTextNode(
      `${qualityLevel.width}x${qualityLevel.height}p`
    );
    option.setAttribute("value", qualityLevel.bitrate);
    option.appendChild(optionText);
    parent.appendChild(option);
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

    createQualitySelectOption(qualityLevel, select);
  });

  qualityLevels.on("change", function (qlchangeevent) {
    if (selectedStreamOption !== null) return;
    if (logger) console.warn("Video Initial Bitrate", streamOptions[0].bitrate);

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
    const resolutionContainerId = "resolution-selector";
    bitrateSelector(player, true, resolutionContainerId);
  });
} catch (error) {
  console.log("error creating player", error);
}
