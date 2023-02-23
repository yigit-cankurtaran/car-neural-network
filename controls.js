class Controls {
  // initial constructor for the controls. false because no keys pressed by default
  constructor(type) {
    this.forward = false;
    this.left = false;
    this.right = false;
    this.reverse = false;

    switch (type) {
      case "KEYS":
        this.#addKeyboardListeners();
        break;
      case "DUMMY":
        this.forward = true;
        break;
    }
  }

  // method to add the listeners
  // hashtag in front because PRIVATE method.
  // can NOT be accessed outside the Controls class
  #addKeyboardListeners() {
    // the tutorial uses "event" for this, but event is deprecated.
    document.onkeydown = (Event) => {
      switch (Event.key) {
        case "ArrowLeft":
          this.left = true;
          break;
        case "ArrowRight":
          this.right = true;
          break;
        case "ArrowUp":
          this.forward = true;
          break;
        case "ArrowDown":
          this.reverse = true;
          break;
      }
      // console.table(this);
    };

    document.onkeyup = (Event) => {
      switch (Event.key) {
        case "ArrowLeft":
          this.left = false;
          break;
        case "ArrowRight":
          this.right = false;
          break;
        case "ArrowUp":
          this.forward = false;
          break;
        case "ArrowDown":
          this.reverse = false;
          break;
      }
      // console.table(this);
    };
  }
}
