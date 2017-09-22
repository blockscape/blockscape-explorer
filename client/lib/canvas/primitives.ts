export function drawSoftRectangle(ctx: CanvasRenderingContext2D, radius: number, x0: number, y0: number, x1: number, y1: number) {

    if(x1 - x0 < radius * 2 || y1 - y0 < radius * 2)
        // shrink the radius to fit, otherwise we get undesirable effects
        radius = Math.min((x1 - x0) / 2, (y1 - y0) / 2);

    ctx.beginPath();
    ctx.moveTo(x0, y0 + radius);
    ctx.lineTo(x0, x1 - radius);
    ctx.quadraticCurveTo(x0, y1, x0 + radius, y1);
    ctx.lineTo(x1 - radius, y1);
    ctx.quadraticCurveTo(x1, y1, x1, y1 - radius);
    ctx.lineTo(x1, y0 + radius);
    ctx.quadraticCurveTo(x1, y0, x1 - radius, y0);
    ctx.lineTo(x0 + radius, y0);
    ctx.quadraticCurveTo(x0, y0, x0, y0 + radius);
    ctx.closePath();
}