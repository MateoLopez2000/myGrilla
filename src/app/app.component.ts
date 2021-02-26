import { absoluteFrom } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AppData } from './AppData';

let eventX: number;
let eventY: number;
let cubeX: number;
let cubeY: number;
let canvWidth: number;
let canvHeight: number;
let count: number;
let positions = new Array();
let tdp: number;
let imageData;
var x1;
var y1;
var x2;
var y2;
var xC;
var yC;
var radius;
var p;
var xCenter;
var yCenter;
var Rx;
var Ry;
var iteracion = 1;
var scale = 1;
let input1;
let input2;
let colorPicked;
tdp = 100;

var mouseClicked = false,
  mouseReleased = true;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'app';
  data = new AppData(0);
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm() {
    const canvas1 = <HTMLCanvasElement>document.getElementById('canvas');
    const ctx = canvas1.getContext('2d');
    let RB1 = document.getElementById('defaultInline1') as HTMLInputElement;
    let RB2 = document.getElementById('defaultInline2') as HTMLInputElement;
    let RB3 = document.getElementById('defaultInline3') as HTMLInputElement;
    let RB4 = document.getElementById('defaultInline4') as HTMLInputElement;
    let RB5 = document.getElementById('defaultInline5') as HTMLInputElement;
    input1 = document.getElementById('pixeles') as HTMLInputElement;
    input2 = document.getElementById('colorPixel') as HTMLInputElement;
    this.ctx = this.canvas.nativeElement.getContext('2d');

    canvHeight = ctx.canvas.height;
    canvWidth = ctx.canvas.width;

    document.addEventListener('click', onMouseClick);

    function onMouseClick(e) {
      //do stuff
      eventX = e.clientX;
      eventY = e.clientY;
      if (
        0 < eventX &&
        eventX < canvWidth &&
        RB1.checked == false &&
        RB2.checked == false &&
        RB3.checked == false &&
        RB4.checked == false &&
        RB5.checked == false
      ) {
        if (0 < eventY && eventY < canvHeight) {
          cubeX = eventX - (eventX % tdp);
          cubeY = eventY - (eventY % tdp);
        }
        ctx.fillStyle = colorPicked;
        ctx.fillRect(cubeX, cubeY, tdp, tdp);
      }

      function circleMiddlePoint(xCenter, yCenter, radius) {
        xC = 0;
        yC = radius;
        p = 1 - radius;

        circlePlotPoints(xCenter, yCenter, xC, yC);
        while (xC < yC) {
          xC++;
          if (p < 0) {
            p += 2 * xC + 1;
          } else {
            yC--;
            p += 2 * (xC - yC) + 1;
          }
          circlePlotPoints(xCenter, yCenter, xC, yC);
        }

        RB2.checked = false;
        positions.splice(0, positions.length);
      }
      function circlePlotPoints(xCenter, yCenter, xC, yC) {
        ctx.fillStyle = colorPicked;
        ctx.fillRect(
          aplicarCorreccion(xCenter + xC),
          aplicarCorreccion(yCenter + yC),
          tdp,
          tdp
        );
        ctx.fillRect(
          aplicarCorreccion(xCenter - xC),
          aplicarCorreccion(yCenter + yC),
          tdp,
          tdp
        );
        ctx.fillRect(
          aplicarCorreccion(xCenter + xC),
          aplicarCorreccion(yCenter - yC),
          tdp,
          tdp
        );
        ctx.fillRect(
          aplicarCorreccion(xCenter - xC),
          aplicarCorreccion(yCenter - yC),
          tdp,
          tdp
        );
        ctx.fillRect(
          aplicarCorreccion(xCenter + yC),
          aplicarCorreccion(yCenter + xC),
          tdp,
          tdp
        );
        ctx.fillRect(
          aplicarCorreccion(xCenter - yC),
          aplicarCorreccion(yCenter + xC),
          tdp,
          tdp
        );
        ctx.fillRect(
          aplicarCorreccion(xCenter + yC),
          aplicarCorreccion(yCenter - xC),
          tdp,
          tdp
        );
        ctx.fillRect(
          aplicarCorreccion(xCenter - yC),
          aplicarCorreccion(yCenter - xC),
          tdp,
          tdp
        );
      }
      function distanceTwoPoints(x1, y1, x2, y2) {
        var a = x2 - x1;
        var b = y2 - y1;
        var result = Math.sqrt(a * a + b * b);
        return result;
      }
      function lineaDDA() {
        x1 = positions[0];
        y1 = positions[1];
        x2 = positions[2];
        y2 = positions[3];
        var dx = x2 - x1,
          dy = y2 - y1,
          steps,
          k;
        var xIncrement,
          yIncrement,
          x = x1,
          y = y1;

        if (Math.abs(dx) > Math.abs(dy)) {
          steps = Math.abs(dx);
        } else {
          steps = Math.abs(dy);
        }
        xIncrement = (dx / parseFloat(steps)) * tdp;
        yIncrement = (dy / parseFloat(steps)) * tdp;

        var x3 = x - (x % tdp);
        var y3 = y - (y % tdp);
        ctx.fillStyle = colorPicked;
        ctx.fillRect(x3, y3, tdp, tdp);

        for (k = 0; k < steps / tdp; k++) {
          x += xIncrement;
          y += yIncrement;
          x3 = x - (x % tdp);
          y3 = y - (y % tdp);
          ctx.fillStyle = colorPicked;
          ctx.fillRect(x3, y3, tdp, tdp);
        }

        RB1.checked = false;
        positions.splice(0, positions.length);
      }
      function lineaBresenham(x, y, x2, y2) {
        var w = x2 - x;
        var h = y2 - y;
        var dx1 = 0,
          dy1 = 0,
          dx2 = 0,
          dy2 = 0;
        if (w < 0) dx1 = -1;
        else if (w > 0) dx1 = 1;
        if (h < 0) dy1 = -1;
        else if (h > 0) dy1 = 1;
        if (w < 0) dx2 = -1;
        else if (w > 0) dx2 = 1;
        var longest = Math.abs(w);
        var shortest = Math.abs(h);
        if (!(longest > shortest)) {
          longest = Math.abs(h);
          shortest = Math.abs(w);
          if (h < 0) dy2 = -1;
          else if (h > 0) dy2 = 1;
          dx2 = 0;
        }
        var numerator = longest >> 1;
        for (let i = 0; i <= longest; i++) {
          ctx.fillRect(aplicarCorreccion(x), aplicarCorreccion(y), tdp, tdp);
          numerator += shortest;
          if (!(numerator < longest)) {
            numerator -= longest;
            x += dx1;
            y += dy1;
          } else {
            x += dx2;
            y += dy2;
          }
        }
        RB4.checked = false;
        positions.splice(0, positions.length);

        //list.Clear();
      }
      function aplicarCorreccion(a) {
        return a - (a % tdp);
      }

      function fillBoundary(x, y, oldColor, newColor) {
        imageData = ctx.getImageData(x, y, tdp, tdp);
        const currentColor = getColor(ImageData);

        console.log('iteracion ' + iteracion);

        if (currentColor == oldColor) {
          ctx.fillStyle = newColor;
          ctx.fillRect(x, y, tdp, tdp);
          iteracion++;

          fillBoundary(x + tdp, y, oldColor, newColor);
          fillBoundary(x - tdp, y, oldColor, newColor);
          fillBoundary(x, y + tdp, oldColor, newColor);
          fillBoundary(x, y - tdp, oldColor, newColor);
        }
      }
      function getColor(imageData) {
        let index = 0;
        var r = imageData.data[index];
        var g = imageData.data[index + 1];
        var b = imageData.data[index + 2];
        var a = imageData.data[index + 3];
        let colour = `rbga(${r},${g},${b},${a})`;
        return colour;
      }
      function ellipseMidPoint(xCenter, yCenter, Rx, Ry) {
        let Rx2 = Rx * Rx;
        let Ry2 = Ry * Ry;
        let twoRx2 = 2 * Rx2;
        let twoRy2 = 2 * Ry2;
        let p;
        let x = 0;
        let y = Ry;
        let px = 0;
        let py = twoRx2 * y;

        ellipsePlotPoints(xCenter, yCenter, x, y);
        //region 1
        p = Round(Ry2 - Rx2 * Ry + 0.25 * Rx2);
        while (px < py) {
          x++;
          px = px + twoRy2;
          if (p < 0) {
            p = p + Ry2 + px;
          } else {
            y--;
            py = py - twoRx2;
            p = p + Ry2 + px - py;
          }
          ellipsePlotPoints(xCenter, yCenter, x, y);
        }
        //region 2
        p = Round(
          Ry2 * (x + 0.5) * (x + 0.5) + Rx2 * (y - 1) * (y - 1) - Rx2 * Ry2
        );
        while (y > 0) {
          y--;
          py = py - twoRx2;
          if (p > 0) {
            p = p + Rx2 - py;
          } else {
            x++;
            px = px + twoRy2;
            p = p + Rx2 - py + px;
          }
          ellipsePlotPoints(xCenter, yCenter, x, y);
        }

        RB3.checked = false;
        positions.splice(0, positions.length);
      }
      function ellipsePlotPoints(xCenter, yCenter, x, y) {
        ctx.fillStyle = colorPicked;
        ctx.fillRect(
          aplicarCorreccion(xCenter + x),
          aplicarCorreccion(yCenter + y),
          tdp,
          tdp
        );
        ctx.fillRect(
          aplicarCorreccion(xCenter - x),
          aplicarCorreccion(yCenter + y),
          tdp,
          tdp
        );
        ctx.fillRect(
          aplicarCorreccion(xCenter + x),
          aplicarCorreccion(yCenter - y),
          tdp,
          tdp
        );
        ctx.fillRect(
          aplicarCorreccion(xCenter - x),
          aplicarCorreccion(yCenter - y),
          tdp,
          tdp
        );
      }
      function Round(a) {
        return a + 0.5;
      }
      function hexToRgbA(hex) {
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
          c = hex.substring(1).split('');
          if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
          }
          c = '0x' + c.join('');
          return (
            'rgba(' +
            [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') +
            ',255)'
          );
        }
        throw new Error('Bad Hex');
      }

      if (RB1.checked == true) {
        if (0 < eventX && eventX < canvWidth) {
          if (0 < eventY && eventY < canvHeight) {
            positions.push(eventX - (eventX % tdp), eventY - (eventY % tdp));
          }
        }
        if (positions.length == 4) {
          lineaDDA();
        }
      }
      if (RB3.checked == true) {
        if (0 < eventX && eventX < canvWidth) {
          if (0 < eventY && eventY < canvHeight) {
            positions.push(eventX - (eventX % tdp), eventY - (eventY % tdp));
          }
        }
        // aqui van los metodos de la elipse
        if (positions.length == 6) {
          let radiusY = distanceTwoPoints(
            positions[0],
            positions[1],
            positions[2],
            positions[3]
          );
          let radiusX = distanceTwoPoints(
            positions[0],
            positions[1],
            positions[4],
            positions[5]
          );

          ellipseMidPoint(positions[0], positions[1], radiusX, radiusY);
        }
      }
      if (RB4.checked == true) {
        if (0 < eventX && eventX < canvWidth) {
          if (0 < eventY && eventY < canvHeight) {
            positions.push(eventX - (eventX % tdp), eventY - (eventY % tdp));
          }
        }
        if (positions.length == 4) {
          lineaBresenham(
            positions[0],
            positions[1],
            positions[2],
            positions[3]
          );
        }
      }
      if (RB2.checked == true) {
        if (0 < eventX && eventX < canvWidth) {
          if (0 < eventY && eventY < canvHeight) {
            positions.push(eventX - (eventX % tdp), eventY - (eventY % tdp));
          }
        }
        // aqui van los metodos de la circunferencia
        if (positions.length == 4) {
          radius = distanceTwoPoints(
            positions[0],
            positions[1],
            positions[2],
            positions[3]
          );

          circleMiddlePoint(positions[0], positions[1], radius);
        }
      }
      if (RB5.checked == true) {
        if (0 < eventX && eventX < canvWidth) {
          if (0 < eventY && eventY < canvHeight) {
            imageData = ctx.getImageData(eventX, eventY, tdp, tdp);
            let oldColor = getColor(imageData);
            console.log(getColor(colorPicked));
            fillBoundary(eventX, eventY, oldColor, getColor(colorPicked));
          }
        }
      }
    }

    ctx.strokeStyle = 'Black';
    ctx.lineWidth = 1;
  }

  iniciar() {
    if (input1.value != '') {
      tdp = input1.value;
    }
    const canvas1 = <HTMLCanvasElement>document.getElementById('canvas');
    const ctx = canvas1.getContext('2d');
    this.ctx.clearRect(0, 0, 1000, 1000);
    this.ctx.beginPath();
    this.drawLines(tdp);
    //this.lineaDDA(200, 200, 800, 800);
  }
  colorChosen() {
    if (input2.value != '') {
      colorPicked = input2.value;
    }
  }
  ZoomIn() {
    scale = scale - 0.5;
    console.log(scale);
    this.ctx.scale(scale, scale);
  }
  ZoomOut() {
    scale = scale + 0.5;
    console.log(scale);
    this.ctx.scale(scale, scale);
  }

  drawLines(tdp) {
    var height = this.ctx.canvas.height;
    var width = this.ctx.canvas.width;

    //loop for columns we iterate over the width and height of the canvas

    for (var i = 0; i <= height; i = i + Number(tdp)) {
      this.ctx.moveTo(i, 0);
      this.ctx.lineTo(i, height);
      this.ctx.stroke(); // this line does draw the line
    }
    //we need to do the same things for rows
    for (var j = 0; j <= width; j = j + Number(tdp)) {
      this.ctx.moveTo(0, j);
      this.ctx.lineTo(width, j);
      this.ctx.stroke(); // this line does draw the line
    }
  }
}
