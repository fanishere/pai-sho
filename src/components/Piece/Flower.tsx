import { Position } from '../types';
import lily from '../../assets/lily.svg';
import rose from '../../assets/rose.svg';
import jasmine from '../../assets/jasmine.svg';
import chrysan from '../../assets/chrysanthemum.svg';
import rhododendron from '../../assets/rhododendron.svg';
import jade from '../../assets/jade.svg';
import { Piece, PieceProps } from './Piece';

export class Flower extends Piece {
  spaces: number;

  constructor(props: PieceProps) {
    super(props);

    this.spaces = 3;
  }
  getSnapLines = (): Position[] => {
    const lines: Position[] = [];
    if (this.props.position === undefined) {
      return lines;
    }
    for (let i = 0; i <= this.spaces; i++) {
      for (let j = 0; j <= this.spaces; j++) {
        if (i === 0 && j === 0) {
          continue;
        }

        lines.push({
          x: this.props.position.x - this.props.gridWidth * i,
          y: this.props.position.y - this.props.gridWidth * j
        });
        lines.push({
          x: this.props.position.x + this.props.gridWidth * i,
          y: this.props.position.y + this.props.gridWidth * j
        });

        if (i !== 0 && j !== 0) {
          lines.push({
            x: this.props.position.x + this.props.gridWidth * i,
            y: this.props.position.y - this.props.gridWidth * j
          });

          lines.push({
            x: this.props.position.x - this.props.gridWidth * i,
            y: this.props.position.y + this.props.gridWidth * j
          });
        }
      }
    }

    return lines;
  };
}

export class Rose extends Flower {
  constructor(props: PieceProps) {
    super(props);

    const img = document.createElement('img');
    img.src = rose;
    this.image = img;
    this.spaces = 3;
  }
}

export class Jasmine extends Flower {
  constructor(props: PieceProps) {
    super(props);

    const img = document.createElement('img');
    img.src = jasmine;
    this.image = img;
    this.spaces = 3;
  }
}

export class Chrysanthemum extends Flower {
  constructor(props: PieceProps) {
    super(props);

    const img = document.createElement('img');
    img.src = chrysan;
    this.image = img;
    this.spaces = 4;
  }
}

export class Lily extends Flower {
  constructor(props: PieceProps) {
    super(props);

    const img = document.createElement('img');
    img.src = lily;
    this.image = img;
    this.spaces = 4;
  }
}

export class Rhododendron extends Flower {
  constructor(props: PieceProps) {
    super(props);

    const img = document.createElement('img');
    img.src = rhododendron;
    this.image = img;
    this.spaces = 5;
  }
}

export class Jade extends Flower {
  constructor(props: PieceProps) {
    super(props);

    const img = document.createElement('img');
    img.src = jade;
    this.image = img;
    this.spaces = 5;
  }
}
