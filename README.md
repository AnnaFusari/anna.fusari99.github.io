# NetytarWeb
<p>
  Try the interface: 
</p>

<p>
  Questo elaborato ha lo scopo di implementare la versione web di Netytar, uno strumento musicale digitale accessibile (ADMI) da persone con disabilita` motoria te- traplegica. La prima fase del lavoro `e stata quella di analizzare lo stato dell’arte. In letteratura sono presenti diversi ADMI sviluppati come software da installare sulla pro- pria macchina. Tuttavia la ricerca di applicazioni web accessibili tramite browser, che forniscano uno strumento musicale digitale accessibile e completo ha portato a risultati ridotti. Per questo motivo NetytarWeb rappresenta una novita` in questo campo.
</p>
<p>
  Questo strumento si basa sul concetto di gaze pointing: l’interfaccia `e stata realizza- ta per consentire al musicista di selezionare i tasti tramite il movimento dello sguardo, in modo tale da utilizzare un canale di interazione che possa superare i limiti fisici imposti da alcuni tipi di disabilit`a. In particolare, questo strumento `e rivolto a tutti gli utenti affetti da tetraplegia, ovvero una paralisi che coinvolge tutto il corpo a partire dalle spalle in giu`.
</p>
<p>
  All’interno dell’eleaborato `e possibile trovare una descrizione dell’implementazione di NetytarWeb attraverso l’analisi di sezioni di codice. L’interfaccia `e formata da una griglia di tasti circolari colorati rappresentanti le note. Ogni colore `e associato a una nota diversa, le linee uniscono gli elementi dell’interfaccia andando a formare una scala, maggiore o minore, a partire dalla nota di riferimento. Vale la pena soffermarsi sul fatto che l’applicazione utilizza la Web MIDI API per comunicare con i dispositivi MIDI messi a disposizione dal client. Essa non rappresenta ancora uno standard ma `e stata scelta come soluzione perch ́e garantisce all’utente la massima liberta` di espressione, dandogli la possibilita` di utilizzare i suoni forniti direttamente dai sintetizzatori installati sulla propria macchina. Per fare in modo che l’applicazione comunichi un messaggio di NoteOn o NoteOff bisogna premere e rilasciare il tasto “P”. E` possibile suonare dei legati selezionando note diverse senza rilasciare il tasto. La performance delle note puo` essere affidata ad un sensore a fiato sviluppato tramite Arduino, che permette di suonare utilizzando il soffio. Il suo utilizzo `e permesso da un’applicazione middleware in grado di gestire gli input del sensore e sostituirli alla pressione del tasto “P”, al tempo stesso inviando segnali MIDI channel pressure in grado di gestire la dinamica del suono.
</p>
<p>
  immmagine
</p>
