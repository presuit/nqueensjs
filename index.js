const checkAfterRight = (row, column, targetArray, count) => {
    const nextRow = row - 1;
    const nextColumn = column + 1;
    let ok;

    if (nextRow < 0 || nextColumn >= targetArray[row].length) {
        // 재귀함수 탈출코드
        return count === 0;
    }
    if (targetArray[nextRow][nextColumn] === "Q") {
        count++;
    }
    ok = checkAfterRight(nextRow, nextColumn, targetArray, count);
    if (ok === false) {
        return false;
    }
    return count === 0;
};

const checkBeforeRight = (row, column, targetArray, count) => {
    const nextRow = row + 1;
    const nextColumn = column - 1;
    let ok;

    if (nextRow >= targetArray.length || nextColumn < 0) {
        // 재귀함수 탈출코드
        return count === 0;
    }
    if (targetArray[nextRow][nextColumn] === "Q") {
        count++;
    }
    ok = checkBeforeRight(nextRow, nextColumn, targetArray, count);
    if (ok === false) {
        return false;
    }
    return count === 0;
};

const checkAfterLeft = (row, column, targetArray, count) => {
    const nextRow = row + 1;
    const nextColumn = column + 1;
    let ok;

    if (nextRow >= targetArray.length || nextColumn >= targetArray[row].length) {
        // 재귀함수 탈출코드
        return count === 0;
    }
    if (targetArray[nextRow][nextColumn] === "Q") {
        count++;
    }
    ok = checkAfterLeft(nextRow, nextColumn, targetArray, count);
    if (ok === false) {
        return false;
    }
    return count === 0;
};

const checkBeforeLeft = (row, column, targetArray, count) => {
    const nextRow = row - 1;
    const nextColumn = column - 1;
    let ok;

    if (nextRow < 0 || nextColumn < 0) {
        // 재귀함수 탈출코드
        return count === 0;
    }
    if (targetArray[nextRow][nextColumn] === "Q") {
        count++;
    }
    ok = checkBeforeLeft(nextRow, nextColumn, targetArray, count);
    if (ok === false) {
        return false;
    }
    return count === 0;
};

const isSideLineClear = (row, column, targetArray) => {
    // todo: targetArray[row][column]에서 좌대각, 우대각에 Q이 존재하는지  확인하고 bool 값 리턴
    // 좌우 대각 확인용 함수를 여러개 만들어서 재귀적 방식으로 돌리고,
    // 각각의 함수에서 true를 리턴해 줘야만 이 함수가 true를 리턴할 수 있다.
    return checkAfterLeft(row, column, targetArray, 0) && checkBeforeLeft(row, column, targetArray, 0) && checkBeforeRight(row, column, targetArray, 0) && checkAfterRight(row, column, targetArray, 0);
};

const isColumnClear = (column, targetArray) => {
    let count = 0;
    for (let i = 0; i < targetArray.length; i++) {
        if (targetArray[i][column] === "Q") {
            count++;
        }
    }

    return count === 1;
};

const isRowClear = (row, targetArray) => {
    let count = 0;
    for (let i = 0; i < targetArray[row].length; i++) {
        if (targetArray[row][i] === "Q") {
            count++;
        }
    }

    return count === 1;
};

const isPromising = (targetArray) => {
    let ok;
    // todo: targetArray 라는 배열을 받아서 이 배열에 있는 queen들이 서로의 영역을 침범하지 않는지 확인하고, bool 값으로 리턴하는 함수.
    for (let i = 0; i < targetArray.length; i++) {
        for (let j = 0; j < targetArray[i].length; j++) {
            if (targetArray[i][j] === "Q") {
                // todo: 가로, 세로, 대각선에 다른 Queen 들이 있는지 없는지 확인.
                // 가로 영역 확인(column)
                ok = isColumnClear(j, targetArray) && isRowClear(i, targetArray) && isSideLineClear(i, j, targetArray);
                if (ok === false) {
                    return ok;
                }
            }
        }
    }

    return ok;
};

const copyArray = (targetArray) => {
    let arr = Array.from(Array(targetArray.length), () => new Array(targetArray.length));

    for (let i = 0; i < targetArray.length; i++) {
        for (let j = 0; j < targetArray[i].length; j++) {
            arr[i][j] = targetArray[i][j];
        }
    }
    return arr;
};

const nQueen = (targetArray, row, depth, count) => {
    let arr = copyArray(targetArray);
    arr[row][depth] = "Q";
    if (isPromising(arr)) {
        // queen을 놓을 수 있다.
        if (depth + 1 >= targetArray.length) {
            count[0] += 1;
            console.log("end point", arr);
            return;
        }
        for (let i = 0; i < arr.length; i++) {
            nQueen(arr, i, depth + 1, count);
        }
    }
    return;
};

const init = (n) => {
    let count = [0];
    let array = Array.from(Array(n), () => new Array(n).fill("X"));

    for (let i = 0; i < array.length; i++) {
        nQueen(array, i, 0, count);
    }
    return count[0];
};

console.log(init(7));
