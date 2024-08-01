ffmpeg -re -i public/assets/videos/tears_of_steel/input.webm -map 0 -map 0 -c copy \
-b:v:0 300k -s:v:0 144x256 -b:v:1 750k -s:v:1 1280x720 -b:v:2 1500k -s:v:2 1920x1080 \
-bf 1 -keyint_min 120 -g 120 -sc_threshold 0 \
-b_strategy 0 -use_timeline 1 -use_template 1 \
-window_size 5 -adaptation_sets "id=0,streams=v id=1,streams=a" \
-f dash public/assets/videos/tears_of_steel/stream_data/manifest.mpd

2160p=3840x2160
1440p=2560×1440
1080p=1920×1080
720p=1280×720
480p=640×480
360p=480×360
240p=426×240
144p=256×144

# start

ffmpeg -i public/assets/videos/tears_of_steel/input.webm -c:a copy -c:v libx264 -preset medium -keyint_min 60 \
-g 60 -sc_threshold 0 -map 0:v -map 0:a -b:v:0 300k -b:v:1 750k \
-b:v:2 1500k -s:v:0 256x144 -s:v:1 1280x720 -s:v:2 1920x1080 -f dash public/assets/videos/tears_of_steel/stream_data/manifest.mpd

Above command maps the video and audio streams from the input file using the -map flag. The -b:v:0 2500k -b:v:1 1500k -b:v:2 750k options specify the different bitrates for each video stream. The -s:v:0, -s:v:1, and -s:v:2 options set the resolutions for the first, second, and third video streams respectively.

The -f dash option specifies the output format as DASH and the output file as "output.mpd".

Note that this command will encode the video using the H.264 video codec and the audio using the same codec as the source file (assuming the source file has compatible audio). The -preset medium option specifies a medium speed encoding preset that balances encoding speed and output quality. The -keyint_min 60 and -g 60 options set the minimum keyframe interval to 60 frames, which is important for streaming video. The -sc_threshold 0 option disables scene change detection, which can cause issues with adaptive bitrate streaming.

# end

# start

MPEG-DASH is a streaming protocol that is used to deliver audio and video content over the internet. It works by dividing the video content into small segments, called "chunks," and storing them on a web server. The video player on the user's device then requests and downloads these chunks as needed, and plays them back in sequence to create a continuous stream.

Imagine MPEG-DASH as a virtual buffet where you can choose from a variety of dishes to create your perfect meal. Just like how you pick and choose from different dishes at the buffet, the video player selects and downloads the video chunks that make up the stream. And just like how the buffet continuously refills and adds new dishes, the video player can request and download new chunks as needed to keep the stream going.

The key feature of MPEG-DASH streaming is its ability to adapt to changing network conditions in real-time. This is achieved through the use of Adaptive Bitrate (ABR) technology, which encodes the video content at multiple bitrates and resolutions and allows the video player to select the appropriate version based on the available bandwidth and other factors.

For example, if the user has a low bandwidth connection, the video player will select a lower bitrate version of the video, which will result in a lower quality but also a smaller file size and faster download time. If the user has a high bandwidth connection, the video player will select a higher bitrate version of the video, which will result in a higher quality but also a larger file size and slower download time.

In this video, I tried to make viewers understand the basic workflow of Dynamic Adaptive Streaming over HTTP also known as DASH. If you are an absolute beginner in video streaming and wanna start somewhere, this video is for you.

There are other protocols for video streaming including HTTP live streaming or HLS, RTSP, RTMP, cmaf, etc, MPEG DASH is the most enriched, open-source, and ISO standard in video streaming. It's an adaptive bitrate streaming protocol over HTTP, which means the video quality will adjust based on the internet speed, as we see on youtube, and it's over HTTP, so no farewell disturbance

Watching the video, you will understand how MPEG DASH-based streaming works in about 5 minutes including what it is and why we are supposed to use this protocol in our applications. To made easy these things, I used 1 mp4 video with FFmpeg on the apache server on my localhost.

FFmpeg is used to convert the video according to the MPEG DASH protocol standard defined by ISO(ISO/IEC 23009-1:2019). the following command is used to convert/segment the video to MPPEG DASH compatible format and to generate the .mpd manifest playlist file.

ffmpeg -re -i input.mp4 -map 0 -map 0 -c:a aac -c:v libx264 -b:v:0 800k -b:v:1 300k -s:v:1 320x170 -profile:v:1 baseline -profile:v:0 main -bf 1 -keyint_min 120 -g 120 -sc_threshold 0 -b_strategy 0 -ar:a:1 22050 -use_timeline 1 -use_template 1 -window_size 5 -adaptation_sets "id=0,streams=v id=1,streams=a" -f dash output_manifest.mpd

Then the generated files are placed on the apache server and accessed the manifest file(.mpd) from the browser to play the video. The magic of DASH is that the MPD master playlist is basically an XML file.

To learn more about the protocol, please follow the link below: https://www.iso.org/standard/79329.html

DASH videos are typically played by MSE players like dash.js for web and Exo player or shaka player in android. It's not supported in HTML by default. It's the state of the art protocol all big tech companies are adopting it day by day.

# end

# start

# for converting to mp4

ffmpeg -i public/assets/videos/tears_of_steel/tears_of_steel_1080p.webm -c:v libx264 -c:a aac -b:a 200k -ss 4 -t 60 public/assets/videos/tears_of_steel/input.mp4

# end

ffmpeg -i \
 -preset $PRESET_P -keyint_min $GOP_SIZE -g $GOP_SIZE -sc_threshold 0 \
 -r $FPS -c:v libx264 -pix_fmt yuv420p -c:a aac -b:a 128k -ac 1 -ar 44100 \
 -map v:0 -s:0 $V_SIZE_1 -b:v:0 2M -maxrate:0 2.14M -bufsize:0 3.5M \
 -map v:0 -s:1 $V_SIZE_2 -b:v:1 145k -maxrate:1 155k -bufsize:1 220k \
 -map v:0 -s:2 $V_SIZE_3 -b:v:2 365k -maxrate:2 390k -bufsize:2 640k \
 -map v:0 -s:3 $V_SIZE_4 -b:v:3 730k -maxrate:3 781k -bufsize:3 1278k \
 -map v:0 -s:4 $V_SIZE_4 -b:v:4 1.1M -maxrate:4 1.17M -bufsize:4 2M \
 -map v:0 -s:5 $V_SIZE_5 -b:v:5 3M -maxrate:5 3.21M -bufsize:5 5.5M \
 -map v:0 -s:6 $V_SIZE_5 -b:v:6 4.5M -maxrate:6 4.8M -bufsize:6 8M \
 -map v:0 -s:7 $V_SIZE_6 -b:v:7 6M -maxrate:7 6.42M -bufsize:7 11M \
 -map v:0 -s:8 $V_SIZE_6 -b:v:8 7.8M -maxrate:8 8.3M -bufsize:8 14M \
 -map 0:a \
 -init_seg_name init\$RepresentationID\$.\$ext\$ -media_seg_name chunk\$RepresentationID\$-\$Number%05d\$.\$ext\$ \
 -use_template 1 -use_timeline 1 \
 -seg_duration 4 -adaptation_sets "id=0,streams=v id=1,streams=a" \
 -f dash Dash/dash.mpd

# start

# if you want stream via various videos with respective quality

ffmpeg -i input.mp4 -c:v libx264 -c:a aac -b:v 5M -b:a 192k -vf scale=-2:360 -profile:v high -level:v 4.2 -dash 1 video_360p.m4s -vf scale=-2:720 -profile:v high -level:v 4.2 -dash 1 video_720p.m4s -vf scale=-2:1080 -profile:v high -level:v 4.2 -dash 1 video_1080p.m4s -adaptation_sets "id=0,streams=v video_360p.m4s id=1,streams=v video_720p.m4s id=2,streams=v video_1080p.m4s" -f dash output.mpd

This command will generate three different video files with resolutions of 360p, 720p, and 1080p. Each video will be encoded using the H.264 video codec and AAC audio codec, with a video bit rate of 5 Mbps and an audio bit rate of 192 kbps. The video will be scaled to the appropriate resolution using the "-vf" option.

The command also includes the "-dash" option to create separate media segments for each video file, which are required for DASH streaming. The output files will be named "video_360p.m4s", "video_720p.m4s", and "video_1080p.m4s", respectively.

Finally, the command includes the "-adaptation_sets" option to specify the different resolutions as separate adaptation sets with unique identifiers (IDs). This is required for DASH streaming to allow the client to switch between different resolutions.

The resulting DASH MPD file will be named "output.mpd" and will contain information about the available adaptation sets and media segments for each resolution.

# end
