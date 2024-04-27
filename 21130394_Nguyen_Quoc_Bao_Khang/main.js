// MSSV 21130394
// Tên  Nguyễn Quốc Bảo Khang
// SĐT  0971445992
// Lớp  DH21DTB


let hint1;
let hint2;
var timeSecond;
var percent;
let board;
var row;
var col;
var level;
var difficult;
var suffer;
let icon = ['pieces1.jpg','pieces2.jpg','pieces3.jpg','pieces4.jpg','pieces5.jpg',
                    'pieces6.jpg','pieces7.jpg','pieces8.jpg','pieces9.jpg','pieces10.jpg',
                    'pieces11.jpg','pieces12.jpg','pieces13.jpg','pieces14.jpg','pieces15.jpg',
                    'pieces16.jpg','pieces17.jpg','pieces18.jpg','pieces19.jpg','pieces20.jpg',
                    'pieces21.jpg','pieces22.jpg','pieces23.jpg','pieces24.jpg','pieces25.jpg',
                    'pieces26.jpg','pieces27.jpg','pieces28.jpg','pieces29.jpg','pieces30.jpg',
    ]
var clickStart = false;
var indexF = null;
var score = 0;
let span = $('span').text(score);

class Point {
    constructor(i, j, isCheck, value) {
        this.i = i;
        this.j = j;
        this.isCheck = isCheck;
        this.value = value;
    }
}

class Line {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }

    get(i) {
        return i == 0 ? this.p1 : this.p2;
    }
}


function newGame(r, column, level, dif, time ,suf) {
    //chỉnh tất cả các thông số về ban đầu
    clearInterval(interval);
    $('.column-x').css('height', '0');
    clickStart = false;
    percent = 0;
    score = 0;
    difficult = dif;
    $('span').text(score);
    timeSecond = time;
    row = r;
    col = column;
    this.level = level;
    indexF = null;
    suffer = suf;


    // tạo mảng
    board = new Array(row + 2);
    for (let i = 0; i < board.length; i++) {
        board[i] = new Array(col + 2)
    }
    let temp = [];
    let index = 0;
    let indexImg = 0;
    while (index < row * col) {
        if (indexImg == icon.length) indexImg = 0;
        temp[index++] = icon[indexImg];
        temp[index++] = icon[indexImg++];
    }

    //trộn mảng
    (temp.sort(function shuffled() {
        return Math.random() - difficult;
    }));

    // random mảng
    index = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (i == 0 || i == board.length - 1 || j == 0 || j == board[i].length - 1) {
                board[i][j] = new Point(i, j, false, 0);
            } else {
                board[i][j] = new Point(i, j, false, temp[index++]);
            }
        }
    }
    if (!hasARoad()) newGame(row, col, level, dif, time);
    show();

}

// tạo màn chơi lv1;
lv1();

// phương thức chọn hình ảnh
function clickImg() {
    if (!clickStart) return;
    let indexL = $(this);
    if (indexL.attr('src') === '') {
        return;
    }
    //icon chon dau tien
    if (indexF === null) {
        indexL.addClass('selected');
        indexF = indexL;
        board[indexF.data("i")][indexF.data("j")].isCheck = true;
    } else if (indexF.attr('src') !== indexL.attr('src')) {
        //icon 2 ko giong 1
        if (!indexL.hasClass('selected') && !indexL.hasClass("disable")) {
            indexL.addClass('selected');
            board[indexF.data("i")][indexF.data("j")].isCheck = false;
            disableBoard();
            setTimeout(function () {
                indexL.removeClass('selected');
                indexF.removeClass('selected');
                indexF = null;
                enableBoard();
            }, 500);
        }
    } else if (indexL.hasClass('selected')) {
        if ($(this).click()) {
            indexL.removeClass('selected');
            indexF = null;
        }
    }
    //2 ảnh giống nhau
    else {
        indexL.addClass('selected');
        board[indexL.data("i")][indexL.data("j")].isCheck = true;
        let check2point = mainGame(board[indexF.data('i')][indexF.data('j')], board[indexL.data('i')][indexL.data('j')]);
        if (check2point != null) {
            $('span').text(score += 10);
            if (score == ((row * col) / 2) * 10) {
                clickStart = true;
                let h1 = $('<h1>').text('Ngài đã thắng');
                $('.theIcon').append(h1);
                $('.theIcon .row').css("display", "none");
                return;
            } else {
                switch (level) {
                    case 1:
                        level1(board[indexF.data("i")][indexF.data("j")], board[indexL.data("i")][indexL.data("j")])
                        break;
                    case 2:
                        level2(board[indexF.data("i")][indexF.data("j")], board[indexL.data("i")][indexL.data("j")])
                        break;
                    case 3:
                        level3(board[indexF.data("i")][indexF.data("j")], board[indexL.data("i")][indexL.data("j")])
                        break;
                    case 4:
                        level4(board[indexF.data("i")][indexF.data("j")], board[indexL.data("i")][indexL.data("j")])
                        break;
                    case 5:
                        level5(board[indexF.data("i")][indexF.data("j")], board[indexL.data("i")][indexL.data("j")])
                        break;
                    case 6:
                        level6(board[indexF.data("i")][indexF.data("j")], board[indexL.data("i")][indexL.data("j")])
                        break;
                }
                show();
            }

            //hết đường đi thì random các hình còn lại
            if (!hasARoad()) {
                alert('Hết đường đi')
                refresh();
            }
            indexF = null;
            return;
        }
        board[indexL.data("i")][indexL.data(
            "j")].isCheck = false;
        board[indexF.data("i")][indexF.data("j")].isCheck = false;
        disableBoard();
        setTimeout(function () {
            indexL.removeClass('selected');
            indexF.removeClass('selected');
            indexF = null;
            enableBoard();
        }, 500);
    }
}


//lv1 không có thay đổi
function level1(p1, p2) {
    // let h2= $('<h2>').addClass("sumtime");
    // let sumTime = h2.text('+ 5s');
    // $('.time').prepend(sumTime);
    board[p1.i][p1.j].value = -1;
    board[p2.i][p2.j].value = -1;
    percent = percent - 1 < 0 ? 0 : percent - 1.2;
    // $('.time.sumtime').hide(1000);
    $('.column-x').css('height', percent + '%');

}
//lv2 dồn hình sang trái
function level2(p1, p2) {
    // Đặt giá trị của p1 và p2 thành 0 trên bảng
    board[p1.i][p1.j].value = 0;
    board[p2.i][p2.j].value = 0;

    // Hàm cập nhật giá trị trên hàng p1.i từ trái qua phải
    updateRow(p1.i);
    // Nếu p1 và p2 không ở cùng hàng, cập nhật giá trị trên hàng p2.i từ trái qua phải
    if (p1.i !== p2.i) updateRow(p2.i);
}

//lv3 dồn hình vào giữa
function level3(p1, p2) {
    board[p1.i][p1.j].value = 0;
    board[p2.i][p2.j].value = 0;

    if (p1.i == p2.i) {
        let tempArr = [];
        let emptyCountFront = 0; // Đếm số lượng ô trống ở đầu hàng
        let emptyCountBack = 0; // Đếm số lượng ô trống ở cuối hàng

        // Tạo mảng tạm chứa các giá trị của hàng
        for (let j = 0; j < board[p1.i].length; j++) {
            if (board[p1.i][j].value != 0 && board[p1.i][j].value != -1) {
                tempArr.push(board[p1.i][j]);
            } else {
                if (j < board[p1.i].length / 2) {
                    emptyCountFront++;
                } else {
                    emptyCountBack++;
                }
            }
        }

        // Đặt các giá trị vào hàng với ô trống ở đầu và ở cuối
        for (let j = 0; j < board[p1.i].length; j++) {
            if (j < emptyCountFront) {
                board[p1.i][j] = new Point(p1.i, j, false, 0);
            } else if (j >= board[p1.i].length - emptyCountBack) {
                board[p1.i][j] = new Point(p1.i, j, false, 0);
            } else {
                board[p1.i][j] = new Point(p1.i, j, false, tempArr[j - emptyCountFront].value);
            }
        }
    } else {
        // Xử lý tương tự cho hàng ngang
        let tempArr1 = [];
        let tempArr2 = [];
        let emptyCountFront1 = 0;
        let emptyCountBack1 = 0;
        let emptyCountFront2 = 0;
        let emptyCountBack2 = 0;

        for (let j = 0; j < board[p1.i].length; j++) {
            if (board[p1.i][j].value != 0 && board[p1.i][j].value != -1) {
                tempArr1.push(board[p1.i][j]);
            } else {
                if (j < board[p1.i].length / 2) {
                    emptyCountFront1++;
                } else {
                    emptyCountBack1++;
                }
            }
        }

        for (let j = 0; j < board[p2.i].length; j++) {
            if (board[p2.i][j].value != 0 && board[p2.i][j].value != -1) {
                tempArr2.push(board[p2.i][j]);
            } else {
                if (j < board[p2.i].length / 2) {
                    emptyCountFront2++;
                } else {
                    emptyCountBack2++;
                }
            }
        }

        for (let j = 0; j < board[p1.i].length; j++) {
            if (j < emptyCountFront1) {
                board[p1.i][j] = new Point(p1.i, j, false, 0);
            } else if (j >= board[p1.i].length - emptyCountBack1) {
                board[p1.i][j] = new Point(p1.i, j, false, 0);
            } else {
                board[p1.i][j] = new Point(p1.i, j, false, tempArr1[j - emptyCountFront1].value);
            }
        }

        for (let j = 0; j < board[p2.i].length; j++) {
            if (j < emptyCountFront2) {
                board[p2.i][j] = new Point(p2.i, j, false, 0);
            } else if (j >= board[p2.i].length - emptyCountBack2) {
                board[p2.i][j] = new Point(p2.i, j, false, 0);
            } else {
                board[p2.i][j] = new Point(p2.i, j, false, tempArr2[j - emptyCountFront2].value);
            }
        }
    }
}
//lv4 dồn hình vào góc trên bên trái
function level4(p1, p2) {
    // Đặt giá trị của p1 và p2 thành 0 trên bảng
    board[p1.i][p1.j].value = 0;
    board[p2.i][p2.j].value = 0;

    // Hàm cập nhật giá trị trên cột p1.j từ trên xuống dưới
    updateColumn(p1.j);
    // Nếu p1 và p2 không ở cùng cột, cập nhật giá trị trên cột p2.j từ trên xuống dưới
    if (p1.j !== p2.j) updateRow(p2.i);
}
//lv5 khi ăn hai ô sau thì 2 ô ăn lúc trước sẽ dồn vào giữa
function level5(p3, p4) {
    // Xác định biên độ hàng và cột của board
    const numRows = board.length;
    const numCols = board[0].length;

    // Hàm để tạo một số ngẫu nhiên trong phạm vi từ min đến max (bao gồm cả min và max)
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Loại bỏ các ô trống ở đầu và cuối hàng trong board
    for (let i = 0; i < numRows; i++) {
        let tempArr = [];
        let emptyCountFront = 0;
        let emptyCountBack = 0;

        // Tạo mảng tạm thời chứa các giá trị không phải là 0 hoặc -1 từ hàng
        for (let j = 0; j < numCols; j++) {
            if (board[i][j].value !== 0 && board[i][j].value !== -1) {
                tempArr.push(board[i][j]);
            } else {
                if (j < numCols / 2) {
                    emptyCountFront++;
                } else {
                    emptyCountBack++;
                }
            }
        }

        // Đặt lại giá trị của các ô trong hàng sao cho các ô trống ở đầu và cuối hàng được gán giá trị 0
        for (let j = 0; j < numCols; j++) {
            if (j < emptyCountFront || j >= numCols - emptyCountBack) {
                board[i][j] = new Point(i, j, false, 0);
            } else {
                board[i][j] = new Point(i, j, false, tempArr[j - emptyCountFront].value);
            }
        }
    }

    // Gán giá trị 0 cho các ô tại vị trí p3 và p4
    board[p3.i][p3.j].value = 0;
    board[p4.i][p4.j].value = 0;
}
// lv6 khi ăn thì sẽ random xem sẽ dồn về trên dưới hay trái phải
function level6(p1, p2) {
    // Đặt giá trị của p1 và p2 thành 0 trên bảng
    board[p1.i][p1.j].value = 0;
    board[p2.i][p2.j].value = 0;

    switch (getRandomNumber(1,4)) {
        case 1:
            updateRow(p1.i);
            if (p1.i !== p2.i) updateRow(p2.i);
            break;
        case 2:
            updateRowNguoc(p1.i);
            if (p1.i !== p2.i) updateRowNguoc(p2.i);
            break;
        case 3:
            updateColumn(p1.j);
            if (p1.j !== p2.j) updateColumn(p2.j);
            break;
        case 4:
            updateColumnNguoc(p1.j);
            if (p1.j !== p2.j) updateColumnNguoc(p2.j);
            break;

    }

}

//dồn về trái
function updateColumn(colIndex) {
    // Tạo một mảng tạm thời để lưu các giá trị khác 0 và -1 trong cột
    let tempArr = [new Point(0, colIndex, false, -1)];
    for (let i = 0; i < board.length; i++) {
        if (board[i][colIndex].value !== 0 && board[i][colIndex].value !== -1) tempArr.push(board[i][colIndex]);
    }
    // Cập nhật giá trị trong cột từ trên xuống dưới
    for (let i = 0; i < board.length; i++) {
        if (i < tempArr.length) board[i][colIndex] = new Point(i, colIndex, false, tempArr[i].value);
        else board[i][colIndex] = new Point(i, colIndex, false, 0);
    }
}
//dồn lên trên
function updateRow(rowIndex) {
    // Tạo một mảng tạm thời để lưu các giá trị khác 0 và -1 trên hàng
    let tempArr = [new Point(rowIndex, 0, false, -1)];
    for (let j = 0; j < board[rowIndex].length; j++) {
        if (board[rowIndex][j].value !== 0 && board[rowIndex][j].value !== -1) tempArr.push(board[rowIndex][j]);
    }
    // Cập nhật giá trị trên hàng từ trái qua phải
    for (let j = 0; j < board[rowIndex].length; j++) {
        if (j < tempArr.length) board[rowIndex][j] = new Point(rowIndex, j, false, tempArr[j].value);
        else board[rowIndex][j] = new Point(rowIndex, j, false, 0);
    }
}
// dồn về phải
function updateRowNguoc(rowIndex) {
    // Tạo một mảng tạm thời để lưu các giá trị khác 0 và -1 trên hàng
    let tempArr = [new Point(rowIndex, 0, false, -1)];
    for (let j = 0; j < board[rowIndex].length; j++) {
        if (board[rowIndex][j].value !== 0 && board[rowIndex][j].value !== -1) tempArr.push(board[rowIndex][j]);
    }
    // Cập nhật giá trị trên hàng từ phải qua trái
    for (let j = board[rowIndex].length - 2, k = tempArr.length -1; j >= 0; j--, k--) {
        if (k >= 0) board[rowIndex][j] = new Point(rowIndex, j, false, tempArr[k].value);
        else board[rowIndex][j] = new Point(rowIndex, j, false, 0);
    }
}
// dồn xuống dưới
function updateColumnNguoc(colIndex) {
    // Tạo một mảng tạm thời để lưu các giá trị khác 0 và -1 trên cột
    let tempArr = [new Point(0, colIndex, false, -1)];
    for (let i = 0; i < board.length; i++) {
        if (board[i][colIndex].value !== 0 && board[i][colIndex].value !== -1) tempArr.push(board[i][colIndex]);
    }


    for (let i = board.length - 2, k = tempArr.length - 1; i >= 0; i--, k--) {
        if (k >= 0) {
            board[i][colIndex] = new Point(i, colIndex, false, tempArr[k].value);
        } else {
            board[i][colIndex] = new Point(i, colIndex, false, 0);
        }
    }

}


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// kiem tra cac duong di
function mainGame(p1, p2) {
    if (p1.i == p2.i) {
        console.log(checkRow(p1, p2, p1.i))
        if (checkRow(p1, p2, p1.i)) {
            return new Line(p1, p2);
        }
    }
    if (p1.j == p2.j) {
        if (checkColumn(p1, p2, p1.j)) {
            return new Line(p1, p2);
        }
    }
    let checkX = checkRectangleX(p1, p2);
    console.log(checkX);
    if (checkX != null) {
        console.log(checkX[0] + ',' + checkX[1])
        return new Line(checkX[0], checkX[1]);
    }
    let checkY = checkRectangleY(p1, p2);
    console.log(checkY);
    if (checkY != null) {
        console.log(checkY[0] + ',' + checkY[1])
        return new Line(checkY[0], checkY[1]);
    }
    return null;

}

// hiển thị icon
function show() {
    $('.theIcon').remove()
    let cell;
    let image;
    let t = $('<div>').addClass("theIcon");
    for (let i = 1; i < board.length - 1; i++) {
        let r = $('<div>').addClass('row');
        for (let j = 1; j < board[i].length - 1; j++) {
            cell = $('<div>').addClass('col cell border');
            if (board[i][j].value != 0 && board[i][j].value != -1) {
                image = $('<img>').addClass('img').attr('src', 'image/' + board[i][j].value);
                image.attr('data-i', i);
                image.attr('data-j', j);
                image.click(clickImg)
                cell.append(image);
            }
            r.append(cell);
            t.append(r)

        }

        $('.gamebox').prepend(t);
    }
}

function disableBoard() {
    $('img').addClass('disabled');
}

function enableBoard() {
    $('img').removeClass('disabled');
}

// mat 2 tam hinh
function lost(p1, p2) {
    p1.fadeOut(function () {
        $(this).remove();

    });
    p2.fadeOut(function () {
        $(this).remove();

    });

}

//tim dg di giua 2 hinh theo hang ngang
function checkRow(j1, j2, x) {
    let min = Math.min(j1.j, j2.j);
    let max = Math.max(j1.j, j2.j);
    for (let i = min; i <= max; i++) {
        // nếu các ô ở giữa 2 hình vẫn còn=> ko ăn dc
        if (board[x][i].value != 0 && board[x][i].value != -1 && !board[x][i].isCheck) {
            return false;
        }
    }
    //nếu các ô ở giữa ko có
    return true;

};

//Tìm dd giữa 2 hình theo column
function checkColumn(i1, i2, y) {
    let min = Math.min(i1.i, i2.i);
    let max = Math.max(i1.i, i2.i);
    for (let i = min; i <= max; i++) {
        // nếu các ô ở giữa 2 hình vẫn còn=> ko ăn dc
        if (board[i][y].value != 0 && board[i][y].value != -1 && !board[i][y].isCheck) {
            return false;
        }
    }
    //nếu các ô ở giữa ko có
    return true;
}

// dường đi giữa 2 hình theo hình chữ nhật mở rộng theo chiều dọc
function checkRectangleY(p1, p2) {
    let listResult = [];
    let value = p1.value;
    let minY = p1;
    let maxY = p2;
    if (p1.j > p2.j) {
        minY = p2;
        maxY = p1;
    }
    for (let i = 0; i < board[0].length; i++) {
        if (checkRow(board[minY.i][minY.j], board[minY.i][i], minY.i) && checkColumn(board[minY.i][i], board[maxY.i][i], i)
            && checkRow(board[maxY.i][maxY.j], board[maxY.i][i], maxY.i)) {
            listResult.push(new Point(minY.i, i, false, 0));
            listResult.push(new Point(maxY.i, i, false, 0));
            return listResult;
        }
    }
    return null;
}

//đường đi giữa 2 hình theo hình chữ nhật mở rộng theo chiều ngang
function checkRectangleX(p1, p2) {
    let listResult = [];
    let value = p1.value;
    let minX = p1;
    let maxX = p2;
    if (p1.i > p2.i) {
        minX = p2;
        maxX = p1;
    }
    for (let i = 0; i < board.length; i++) {
        if (i == board.length - 1) {
            console.log(checkColumn(board[minX.i][minX.j], board[i][minX.j], minX.j)
                , checkRow(board[i][minX.j], board[i][maxX.j], i)
                , checkColumn(board[maxX.i][maxX.j], board[i][maxX.j], maxX.j))
        }
        if (checkColumn(board[minX.i][minX.j], board[i][minX.j], minX.j)
            && checkRow(board[i][minX.j], board[i][maxX.j], i)
            && checkColumn(board[maxX.i][maxX.j], board[i][maxX.j], maxX.j)) {
            listResult.push(new Point(i, minX.j, false, 0));
            listResult.push(new Point(i, maxX.j, false, 0));
            return listResult;
        }
    }
    return null;

}


var interval;

// thời gian khi nhấn nút bắt đầu sẽ bắt đầu đếm
function thoiGian() {
    let h = $('<h1>').text('Hết giờ !!!');
    clickStart = true;
    refreshCount =0;
    let t = timeSecond / 100;
    interval = setInterval(function () {
        if (percent == 100) {
            $('.theIcon').append(h);
            $('.theIcon .row').css("display", "none");
            clearInterval(interval);
        } else {

        }
        $('.column-x').css('height', ++percent + "%");
    }, t * 1000);
}

// chức năng tạm dừng
function stop() {
    clickStart = false;
    clearInterval(interval);
    let h = $('<h1>').text('Tiếp đi đừng dừng lại ');
    h.addClass('header-stop')
    $('.theIcon').append(h);
    $('.theIcon .row').css("display", "none");

    let btnResume = $('<button>').text('Tiếp tục')
    btnResume.addClass('btn_menu');
    btnResume.addClass('btn-resume');
    btnResume.click(resume);
    $('.stop').replaceWith(btnResume);
}

// chơi lại
function reset() {

    clickStart = false;
    clearInterval(interval);
    $('span').text(0);
    score = 0;
    $('.column-x').css('height', "0%");
    $('.theIcon').remove();
    newGame(row, col, level, difficult, timeSecond);
    refreshCount =0;
}

//   tiếp tục
function resume() {
    let i = $('<i>').addClass('fa-solid fa-stop')
    clickStart = true;
    let t = timeSecond / 100;
    let btnStop = $('<button>').text(' Tạm dừng');
    btnStop.prepend(i);
    btnStop.addClass('btn_menu');
    btnStop.addClass('stop');
    btnStop.click(stop);
    $('.btn-resume').replaceWith(btnStop)
    $('.column-x').css('height', percent + "%");
    $('.header-stop').remove();
    $('.theIcon .row').css("display", "flex");

    let h = $('<h1>').text('Hết giờ !!!');
    interval = setInterval(function () {
        if (percent == 100) {
            $('.theIcon').append(h);
            $('.theIcon .row').css("display", "none");
            percent = 0;
            clearInterval(interval);
        } else {

        }
        $('.column-x').css('height', ++percent + "%");
    }, t * 1000);
}

// ktra còn đường đi hay không?
function hasARoad() {
    let current;
    for (let i = 1; i < board.length - 1; i++) {
        for (let j = 1; j < board[i].length - 1; j++) {
            if (board[i][j].value != 0 && board[i][j].value != -1) {
                current = board[i][j];
                for (let k = i; k < board.length - 1; k++) {
                    for (let l = 1; l < board[k].length - 1; l++) {
                        if (board[k][l].value == current.value && (board[k][l].i != current.i || board[k][l].j != current.j)) {
                            current.isCheck = true;
                            board[k][l].isCheck = true;
                            if (mainGame(board[k][l], current) != null) {
                                current.isCheck = false;
                                board[k][l].isCheck = false;
                                hint1 = current;
                                hint2 = board[k][l];
                                console.log(hint1, hint2)
                                return true;
                            }
                            current.isCheck = false;
                            board[k][l].isCheck = false;
                        }
                    }
                }
            }
        }
    }
    return false;
}



function lv1() {
    newGame(9, 18, 1, 0.4, 250);
    $('.levelbtn').css('background', 'white')
    $('.levelbtn.level1').css('background', '#fab0b0')
}

function lv2() {
    newGame(9, 18, 2, 0.5, 230);
    $('.levelbtn').css('background', 'white')
    $('.levelbtn.level2').css('background', '#fab0b0')
    // $('.theIcon.img').css('width', '50px')
    // $('.theIcon.img').css('height', '50px')
    // $('.gamepikachu.border').css('width', '50px')
    // $('.gamepikachu.border').css('height', '50px')
}
function lv3() {
    newGame(9, 18, 3, 0.6, 210);
    $('.levelbtn').css('background', 'white')
    $('.levelbtn.level3').css('background', '#fab0b0')
}
function lv4() {
    newGame(9, 18, 4, 0.7, 190);
    $('.levelbtn').css('background', 'white')
    $('.levelbtn.level4').css('background', '#fab0b0')
}
function lv5() {
    newGame(9, 18, 5, 0.8, 170);
    $('.levelbtn').css('background', 'white')
    $('.levelbtn.level5').css('background', '#fab0b0')
}
function lv6() {
    newGame(9, 18, 6, 0.9, 150);
    $('.levelbtn').css('background', 'white')
    $('.levelbtn.level6').css('background', '#fab0b0')
}


let refreshCount =0;
function refresh() {
    if (refreshCount >= 10) {
        // Đã đạt đến giới hạn số lần refresh, không thực hiện nữa
        alert("Bạn đã đạt đến giới hạn số lần refresh.");
        return;
    }

    let temp = [];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].value != 0 && board[i][j].value != -1) temp.push(board[i][j].value);
        }
    }
    temp.sort(function shuffled() {
        return Math.random() - difficult;
    });

    let index = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].value != 0 && board[i][j].value != -1) {
                board[i][j] = new Point(i, j, false, temp[index++]);
            }
        }
    }
    if (!hasARoad()) refresh();

    // Tăng biến đếm số lần refresh
    refreshCount++;

    show();
}
const popupBtn = document.getElementById('popupBtn');
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('closeBtn');

popupBtn.addEventListener('click', function() {
    popup.style.display = 'block';  // Hiển thị popup khi click vào nút
});

closeBtn.addEventListener('click', function() {
    popup.style.display = 'none';  // Ẩn popup khi click vào nút đóng
});


