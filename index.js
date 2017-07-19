// fs = require('fs')
// console.log(process.argv[2])

class Analizer {
  constructor(file_name) {
    this.file_name = file_name
    this.fileParser(this.showSourceMatrix)
    this.matrix = []
    this.n = 8
    this.m = 8
  }

  fileParser(callback) {
    let lineReader = require('readline').createInterface({
      input: require('fs').createReadStream(this.file_name)
    });

    lineReader.on('line', function (line, showSourceMatrix) {
      this.matrix.push(line.split(' '))
    }.bind(this)).on('close', function() {
      this.calculateResultMatrix()
    }.bind(this));
  }

  calculateResultMatrix() {
    for(var i = 0; i < this.n; i++) {
      for(var j = 0; j < this.m; j++) {
        let mine_counter = 0
        if(this.matrix[i][j] == 'O') {
          if(j > 0 && this.matrix[i][j - 1] == 'X') { mine_counter++; } // Слева
          if(j < this.m - 1 && this.matrix[i][j + 1] == 'X') { mine_counter++; } // Справа

          if(i > 0 && this.matrix[i - 1][j] == 'X' ) { mine_counter++; } // Сверху
          if(i < this.matrix.length - 1 && this.matrix[i + 1][j] == 'X' ) { mine_counter++; } // Снизу

          if(i + 1 <= this.n - 1 && j + 1 < this.m && this.matrix[i + 1][j + 1] == 'X' ) { mine_counter++; } // Справа низ
          if(i + 1 <= this.n - 1 && j - 1 >= 0 && this.matrix[i + 1][j - 1] == 'X' ) { mine_counter++; } // Слева низ

          if(i - 1 >= 0 && j - 1 >= 0 && this.matrix[i - 1][j - 1] == 'X' ) { mine_counter++; } // Сверху слева
          if(i - 1 >= 0 && j + 1 <= this.m - 1 && this.matrix[i - 1][j + 1] == 'X' ) { mine_counter++; } // Сверху справа

          this.matrix[i][j] = mine_counter.toString()
        } else {
          this.matrix[i][j] = 'X'
        }
      }
    }
    this.showMatrix()
  }

  showMatrix() {
    console.log('result matrix');
    console.log(this.matrix);
  }
}

const analizer = new Analizer(process.argv[2])
