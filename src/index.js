export class ZoomHover {

    constructor(lowResImage, highResImage) {
        this.lowResImage = lowResImage;
        this.highResImage = highResImage;

        if (!this.lowResImage || !this.highResImage) {
            throw new Error('ZoomHover requires two images on initialisation.');
        }

        this._init();
    }

    _init() {
        this._wrapZoomedImage();
        this._addEventListeners();
    }

    _wrapZoomedImage() {
        this.highResCont = document.createElement('div');
        this.highResCont.appendChild(this.highResImage);

        document.appendChild(this.highResCont);

        this.offset = this.highResCont.clientWidth / 2;
    }


    _zoom(e) {
      let posX = e.offsetX ? (e.offsetX) : e.pageX - this.lowResImage.offsetLeft;
      let posY = e.offsetY ? (e.offsetY) : e.pageY - this.lowResImage.offsetTop;

      this.highResCont.style.transform = `translate(${e.pageX}px, ${e.pageY}px)`;

      posX = Math.round((posX / this.lowResImage.clientWidth) * 1200);
      posY = Math.round((posY / this.lowResImage.clientHeight) * 1200);

      this.highResImage.style.transform = `translate(-${posX - offset}px, -${posY - offset}px)`;
    }

    _displayOverlay (e, shouldDisplay) {
        if (shouldDisplay) this.highResCont.style.opacity = 1;
        else this.highResCont.style.opacity = 0;
    };

    _addEventListeners() {
      this.lowResImage.addEventListener('mousemove', this._zoom);
      this.lowResImage.addEventListener('mouseenter', () => this.displayOverlay(true));
      this.lowResImage.addEventListener('mouseleave', () => this.displayOverlay());
    }

}
