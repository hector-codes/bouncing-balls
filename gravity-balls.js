const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/** @type {CanvasRenderingContext2D} */
const c = canvas.getContext('2d');
const deg = Math.PI / 180;
const mouse = {
    x: undefined,
    y: undefined,
};

const colors = [
    '#28364A',
    '#FFEED6',
    '#F7C45F',
    '#D65353',
    '#2D5C5C',
];

const helpers = {
    trackMouseMove: function(e) {
        mouse.x = e.x;
        mouse.y = e.y
    },

    handleResize: function(e) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    },

    random: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
}

class Object {
    constructor(x, y, dx=0, dy=0, r=50) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.r = this.originalR = r;
        // this.color = `#${Math.floor(Math.random() * 255 * 255 * 255).toString(16)}`;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    };

    draw() {
        c.strokeStyle = this.color;
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, 360 * deg, false);
        c.fill();
    };

    update() {

        if (this.x + this.r >= canvas.width) {
            this.dx = -this.dx * 0.9;
            this.x = canvas.width - this.r;
        } else if (this.x <= this.r){
            this.dx = -this.dx * 0.9;
            this.x = this.r;
        }

        if (this.y + this.r >= canvas.height) {
            this.dy = -this.dy * 0.9;
            this.dx *= 0.8;
            this.y = canvas.height - this.r;
        } else if (this.y <= this.radius){
            this.dy = -this.dy * 0.9;
            this.y = this.r;
        }

        this.dy += 0.4; 

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    };
}

let objects = [];

animate = function() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);

    for( let i = 0; i < objects.length; i++) {
        objects[i].update();
    }
}

init = function() {
    objects = [];

    for(let i = 0; i < 200; i++) {
        let x = Math.floor(50 + Math.random() * (canvas.width - 99));
        let y = Math.floor(50 + Math.random() * (canvas.height - 99));
        let dx = helpers.random(-5, 5);
        let dy = 0;
    
        objects.push( new Object( x, y, dx, dy, helpers.random(1, 50) ) );
    }
}

window.addEventListener( 'mousemove', helpers.trackMouseMove, );
window.addEventListener( 'resize', helpers.handleResize );

init();
animate();
