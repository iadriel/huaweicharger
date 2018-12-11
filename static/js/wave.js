/**
 *
 */
function Wave() {

    /** The current dimensions of the screen (updated on resize) */
    let WIDTH;
    let HEIGHT;
    let PERCENTAGE;

    /** Wave settings */
    let DENSITY = .85;
    let FRICTION = 1.14;
    let DETAIL = 10; // The number of particles used to build up the wave
    let TWITCH_INTERVAL = 1000; // The interval between random impulses being inserted into the wave to keep it moving


    let canvas, phone, context, particles;

    let timeUpdateInterval, twitchInterval;

    /**
     * Constructor.
     */
    this.Initialize = function (canvasID, percentage) {
        PERCENTAGE = percentage;
        canvas = document.getElementById(canvasID);

        phone = $('#device')[0];

        WIDTH = phone.width - (phone.width * .001);
        HEIGHT = phone.height - (phone.height * .06);

        if (canvas && canvas.getContext) {
            context = canvas.getContext('2d');

            particles = [];

            // Generate our wave particles
            for (let i = 0; i < DETAIL + 1; i++) {
                particles.push({
                    x: WIDTH / (DETAIL - 4) * (i - 2), // Pad by two particles on each side
                    y: HEIGHT,
                    original: {x: 0, y: HEIGHT * PERCENTAGE},
                    velocity: {x: 0, y: Math.random() * 3}, // Random for some initial movement in the wave
                    force: {x: 0, y: 0},
                    mass: 10
                });
            }

            $(window).resize(ResizeCanvas);
            timeUpdateInterval = setInterval(TimeUpdate, 40);
            twitchInterval = setInterval(Twitch, TWITCH_INTERVAL);
            ResizeCanvas();


        }
    };

    this.setPercentage = function (percentage) {
        PERCENTAGE = percentage;
        TimeUpdate();
    };


    /**
     * Inserts a random impulse to keep the wave moving.
     * Impulses are only inserted if the mouse is not making
     * quick movements.
     */
    function Twitch() {
        let forceRange = 3; // -value to +value
        InsertImpulse(Math.random() * WIDTH, (Math.random() * (forceRange * 2) - forceRange));
    }

    /**
     * Inserts an impulse in the wave at a specific position.
     *
     * @param positionX the x coordinate where the impulse
     * should be inserted
     * @param forceY the force to insert
     */
    function InsertImpulse(positionX, forceY) {
        let particle = particles[Math.round(positionX / WIDTH * particles.length)];

        if (particle) {
            particle.force.y += forceY;
        }
    }

    /**
     *
     */
    function TimeUpdate() {

        let gradientFill = context.createLinearGradient(WIDTH * PERCENTAGE, HEIGHT * .2, WIDTH * PERCENTAGE, HEIGHT);
        gradientFill.addColorStop(0, '#00D89E');
        gradientFill.addColorStop(1, '#00CE5F');

        particles[0].y = HEIGHT * PERCENTAGE;
        particles[0].original.y = HEIGHT * PERCENTAGE;

        if (particles[10].hasOwnProperty("y") && particles[10].hasOwnProperty("original")) {
            particles[10].y = HEIGHT * PERCENTAGE;
            particles[10].original.y = HEIGHT * PERCENTAGE;
        }

        context.clearRect(0, 0, WIDTH, HEIGHT);
        context.fillStyle = gradientFill;
        context.beginPath();
        context.moveTo(particles[0].x, particles[0].y);

        let len = particles.length;
        let i;

        let current, previous, next;

        for (i = 0; i < len; i++) {
            current = particles[i];
            previous = particles[i - 1];
            next = particles[i + 1];

            if (previous && next) {

                let forceY = 0;

                forceY += -DENSITY * (previous.y - current.y);
                forceY += DENSITY * (current.y - next.y);
                forceY += DENSITY / 15 * (current.y - HEIGHT * PERCENTAGE);

                current.velocity.y += -(forceY / current.mass) + current.force.y;
                current.velocity.y /= FRICTION;
                current.force.y /= FRICTION;
                current.y += current.velocity.y;


                // cx, cy, ax, ay
                context.quadraticCurveTo(previous.x, previous.y, previous.x + (current.x - previous.x) / 2, previous.y + (current.y - previous.y) / 2);
            }

        }

        context.lineTo(particles[particles.length - 1].x, particles[particles.length - 1].y);
        context.lineTo(WIDTH, HEIGHT);
        context.lineTo(0, HEIGHT);
        context.lineTo(particles[0].x, particles[0].y);

        context.fill();

        context.fillStyle = "#00CE5F";
        context.beginPath();

        context.fill();
    }

    /**
     *
     */
    function ResizeCanvas() {

        canvas.width = phone.width - (phone.width * .001);
        canvas.height = phone.height - (phone.height * .06);

        for (let i = 0; i < DETAIL + 1; i++) {
            particles[i].x = WIDTH / (DETAIL - 4) * (i - 2);
            particles[i].y = HEIGHT * PERCENTAGE;

            particles[i].original.x = particles[i].x;
            particles[i].original.y = particles[i].y;
        }
    }

}

