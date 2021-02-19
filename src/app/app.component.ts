import { absoluteFrom } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as $ from 'jquery';

let eventX: number;
let eventY: number;
let cubeX: number;
let cubeY: number;
let canvWidth: number;
let canvHeight: number;
let count: number;
let positions = new Array();
var x1;
var y1;
var x2;
var y2;
var radius;
var p;
var mouseClicked = false,
  mouseReleased = true;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  ngOnInit(): void {
    const canvas1 = <HTMLCanvasElement>document.getElementById('canvas');
    const ctx = canvas1.getContext('2d');
    let RB1 = document.getElementById('defaultInline1') as HTMLInputElement;
    let RB2 = document.getElementById('defaultInline1') as HTMLInputElement;
    let RB3 = document.getElementById('defaultInline1') as HTMLInputElement;

    this.ctx = this.canvas.nativeElement.getContext('2d');

    canvHeight = ctx.canvas.height;
    canvWidth = ctx.canvas.width;

    document.addEventListener('click', onMouseClick);
    //document.addEventListener('mousemove', onMouseMove, false);

    function onMouseClick(e) {
      //do stuff
      eventX = e.clientX;
      eventY = e.clientY;
      if (0 < eventX && eventX < canvWidth) {
        if (0 < eventY && eventY < canvHeight) {
          cubeX = eventX - (eventX % 100);
          cubeY = eventY - (eventY % 100);
        }
      }
      ctx.fillRect(cubeX, cubeY, 100, 100);

      if (RB1.checked == true) {
        if (0 < eventX && eventX < canvWidth) {
          if (0 < eventY && eventY < canvHeight) {
            console.log('rb1');
            positions.push(eventX - (eventX % 100), eventY - (eventY % 100));
          }
        }
        if (positions.length == 4) {
          console.log('rb1 2.0');
          console.log(positions);
          let m: number;
          x1 = positions[0];
          y1 = positions[1];
          x2 = positions[2];
          y2 = positions[3];
          console.log(positions[0] + 'hello');
          console.log(positions[1]);
          console.log(positions[2]);
          console.log(positions[3]);

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
          xIncrement = (dx / parseFloat(steps)) * 100;
          yIncrement = (dy / parseFloat(steps)) * 100;

          var x3 = x - (x % 100);
          var y3 = y - (y % 100);

          ctx.fillRect(x3, y3, 100, 100);

          for (k = 0; k < steps / 100; k++) {
            x += xIncrement;
            y += yIncrement;
            x3 = x - (x % 100);
            y3 = y - (y % 100);
            ctx.fillRect(x3, y3, 100, 100);
          }
          console.log('salimos');
          RB1.checked = false;
          positions.splice(0, positions.length);
          console.log(positions);
        }
      }
      /*if (RB3.checked == true) {
        if (0 < eventX && eventX < canvWidth) {
          if (0 < eventY && eventY < canvHeight) {
            console.log('rb3');
            positions.push(eventX - (eventX % 100), eventY - (eventY % 100));
          }
        }
        x = 0;
        y = radius;
        p = 1 - radius;
      } */
    }

    ctx.strokeStyle = 'Black';
    ctx.lineWidth = 1;
  }
  buildForm() {}

  lineaDDA(x1, y1, x2, y2) {
    let m: number;
    while (x1 != x2 && y1 != y2) {
      this.ctx.fillRect(x1, y1, 100, 100);
      m = (y2 - y1) / (x2 - x1);
      if (m < 1) {
        x1 = x1 + 1;
        y1 = y1 + m;
      } else if (m > 1) {
        y1 = y1 + 1;
        x1 = (x1 + 1) / m;
      } else if (m == 1) {
        x1 = x1 + 1;
        y1 = y1 + 1;
      }
    }
  }
  aplicarCorreccion(a) {
    return a - (a % 100);
  }

  iniciar() {
    const canvas1 = <HTMLCanvasElement>document.getElementById('canvas');
    const ctx = canvas1.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.drawLines();
    //this.lineaDDA(200, 200, 800, 800);
  }

  drawLines() {
    var height = this.ctx.canvas.height;
    var width = this.ctx.canvas.width;

    //loop for columns we iterate over the width and height of the canvas
    for (var i = 0; i <= height; i = i + height / 10) {
      this.ctx.moveTo(i, 0);
      this.ctx.lineTo(i, height);
      this.ctx.stroke(); // this line does draw the line
    }
    //we need to do the same things for rows
    for (var j = 0; j <= width; j = j + width / 10) {
      this.ctx.moveTo(0, j);
      this.ctx.lineTo(width, j);
      this.ctx.stroke(); // this line does draw the line
    }
  }

  animate(): void {}
}
