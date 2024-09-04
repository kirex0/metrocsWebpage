
// Pong Game Animation
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    document.getElementById('pong').appendChild(canvas);

    const paddleWidth = 10;
    const paddleHeight = 100;
    const ballSize = 10;

    const player = {
        x: 0,
        y: canvas.height / 2 - paddleHeight / 2,
        width: paddleWidth,
        height: paddleHeight,
        color: '#fff',
        dy: 0
    };

    const computer = {
        x: canvas.width - paddleWidth,
        y: canvas.height / 2 - paddleHeight / 2,
        width: paddleWidth,
        height: paddleHeight,
        color: '#fff',
        dy: 2
    };

    const ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: ballSize,
        speedX: 3,
        speedY: 2,
        color: '#fff'
    };

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, player.width, player.height);
        ctx.fillStyle = computer.color;
        ctx.fillRect(computer.x, computer.y, computer.width, computer.height);
        ctx.fillStyle = ball.color;
        ctx.fillRect(ball.x, ball.y, ball.size, ball.size);
    }

    function update() {
        ball.x += ball.speedX;
        ball.y += ball.speedY;

        // Ball collision with top and bottom
        if (ball.y <= 0 || ball.y + ball.size >= canvas.height) {
            ball.speedY *= -1;
        }

        // Ball collision with paddles
        if (
            (ball.x <= player.x + player.width && ball.y >= player.y && ball.y <= player.y + player.height) ||
            (ball.x + ball.size >= computer.x && ball.y >= computer.y && ball.y <= computer.y + computer.height)
        ) {
            ball.speedX *= -1;
        }

        // Ball reset if out of bounds
        if (ball.x <= 0 || ball.x + ball.size >= canvas.width) {
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            ball.speedX = -ball.speedX;
            ball.speedY = (Math.random() - 0.5) * 4;
        }

        // Computer AI movement
        if (ball.y > computer.y + computer.height / 2) {
            computer.y += computer.dy;
        } else {
            computer.y -= computer.dy;
        }

        // Prevent paddles from going out of bounds
        player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));
        computer.y = Math.max(0, Math.min(canvas.height - computer.height, computer.y));
    }

    function loop() {
        draw();
        update();
        requestAnimationFrame(loop);
    }

    loop();

    document.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        player.y = e.clientY - rect.top - player.height / 2;
    });
});
