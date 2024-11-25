# NetytarWeb 

<p align="center">
    Try 
  <a href="https://annafusari.github.io/netytarweb/">NetytarWeb</a>
</p>

<p>This project aims to implement the web version of Netytar, a digital accessible musical instrument (ADMI) designed for individuals with tetraplegic motor disabilities.</p>
<p>
   This instrument is based on the concept of gaze pointing: the interface is designed to allow musicians to select keys using eye movement, enabling interaction that overcomes the physical limitations imposed by certain types of disabilities. Specifically, it is targeted at users affected by tetraplegia, a condition involving paralysis of the body from the shoulders downward. 
</p>
<p>
   The interface consists of a grid of colored circular keys representing musical notes. Each color corresponds to a different note, and lines connect the interface elements to form a major or minor scale based on the reference note. Notably, the application uses the Web MIDI API to communicate with MIDI devices provided by the client. While not yet a standard, this choice was made to give users maximum freedom of expression, allowing them to use sounds directly from synthesizers installed on their devices. To send a NoteOn or NoteOff message, the "P" key must be pressed and released. Legato playing is possible by selecting different notes without releasing the key. 
</p>
<p align="center">
    <img src="images/interface.png" alt="alt text" width="50%" height="50%">
</p>
<p>
    The interface includes a collapsible menu, as shown in Fig. 1, with two types of commands: those for managing available MIDI ports and those for the key grid. This was designed to maximize space for the key grid.
</p>
<p>
    Regarding grid settings, users can adjust the distance between keys, set the reference note and scale (major or minor), add note names below corresponding keys, and enable autoscrolling. Autoscrolling allows smooth navigation of the keyboard via gaze pointing, reaching notes not currently visible on the screen.
</p>

<p align="center">
    <img src="images/img2.png" alt="alt text" width="50%" height="50%">
</p>

<p>
    The key grid was designed with an isomorphic layout: each note is surrounded by eight adjacent elements, whose position relative to the reference note defines the increment or decrement in semitones, as shown in Fig. 2. Thanks to this layout, transposing a scale, chord, or musical piece does not alter the shape of the path to be played.
</p>
<p>
    To play NetytarWeb using eye movement, an eye tracker is required. During development, the Tobii Eye Tracker 5 was used, which comes with software for device calibration. Through a middleware application, it replaces the mouse cursor, an option activated by pressing the “L” key.
</p>

## How to use NetytarWeb
<h3>Hardware Requirements</h3>
<p>To use NetytarWeb, you need:</p>
<ul>
    <li>a computer connected to the internet and equipped with a compatible browser</li>
    <li>a breath sensor built with Arduino; instructions for its construction are available at: https://github.com/Neeqstock/NeeqSensors</li>
    <li>a Tobii Eye Tracker device (currently compatible only with the Windows operating system)</li>
</ul>

<h3>Software Requirements</h3>
<p>To use NetytarWeb, the following software must be installed on your computer:</p>
<ul>
    <li>Google Chrome is strongly recommended</li>
    <li>Tobii Drivers (https://gaming.tobii.com/getstarted/)</li>
    <li>A middleware application for using the breath sensor, available at:
https://github.com/Neeqstock/NetytarWebController. </li>
    <li>
A software synthesizer or a DAW that provides a sound library:
        <ul>
            <li>Apple operating system: Garageband can be used (https://www.apple.com/it/mac/garageband/) and MIDI ports can be configured through the IAC driver (Settings/MIDI Configuration window/Show MIDI Studio).</li>
            <li>Windows operating system: It is possible to use LoopMidi (https://www.tobias-erichsen.de/software/loopmidi.html) to create a virtual MIDI connection on the machine. VSTHost (https://www.hermannseib.com/english/vsthost.htm) can be used to load VST plugins, many of which are available for free on the Plugins4Free website (https://plugins4free.com/).</li>
        </ul>
    </li>
</ul>



