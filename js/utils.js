function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell-' + i + '-' + j;
      strHTML += '<td class="' + className + '"> ' + cell + ' </td>';
    }
    strHTML += '</tr>';
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function countFoodOnBoard(board) {
  var foodOnBoard = 0;

  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if (board[i][j] === FOOD) foodOnBoard++;
    }
  }
  return foodOnBoard - 1;
}

function getRandomColor() {
  var rendomColor = `rgba(${getRandomIntInclusive(
    0,
    255
  )}, ${getRandomIntInclusive(0, 255)}, ${getRandomIntInclusive(0, 255)})`;

  return rendomColor;
}

function findGhostIdx(ghosts, pos) {
  for (var i = 0; i < ghosts.length; i++) {
    if (pos.i === ghosts[i].location.i && pos.j === ghosts[i].location.j) {
      console.log(ghosts[i].location);
      console.log(i);
      console.log('from here');
      console.log(ghosts[i].location);
      return i;
    }
  }
  console.log('didnt work');
  return null;
}

function findEmptyCell(board) {
  var emptyCellArray = [];
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if (
        board[i][j] !== WALL &&
        board[i][j] !== PACMAN &&
        board[i][j] !== SUPER_FOOD
      ) {
        emptyCellArray.push({ i, j });
      }
    }
  }
  randomCell =
    emptyCellArray[getRandomIntInclusive(0, emptyCellArray.length - 1)];
  return randomCell;
}

const Elghost = document.querySelector('.ghost-svg');

console.log(Elghost);

function ghostSvg(color = 'white') {
  return `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg width="23px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 280.173 280.173" style="enable-background:new 0 0 280.173 280.173;" xml:space="preserve">
<g>
	<path style="fill:${color};" d="M133.961,0.145C63.079,3.645,8.824,64.026,8.824,134.908v66.506l0,0c0,15.752,0,48.13,0,65.631
		c0,6.126,6.126,9.626,11.376,6.126l20.127-12.251c7.876-4.375,17.502-4.375,25.377,0l18.377,10.501
		c7.876,4.375,17.502,4.375,25.377,0l18.377-10.501c7.876-4.375,17.502-4.375,25.377,0l18.377,10.501
		c7.876,4.375,17.502,4.375,25.377,0l18.377-10.501c7.876-4.375,17.502-4.375,25.377,0l19.252,11.376
		c5.251,2.625,11.376-0.875,11.376-6.126c0-18.377,0-50.755,0-65.631l0,0v-70.007C271.349,57.025,209.218-3.355,133.961,0.145z"/>
	<g>
		<g>
			<g>
				<path style="fill:${color};" d="M26.325,131.408c0-69.132,54.255-126.012,122.512-131.263c-2.625,0-6.126,0-8.751,0
					C67.454,0.145,8.824,58.776,8.824,131.408c0,0,0,147.889,0,148.765c7.876,0,13.126-3.5,17.502-7.876
					C26.325,256.545,26.325,131.408,26.325,131.408z"/>
			</g>
		</g>
	</g>
	<path style="fill:white;" d="M188.216,113.906c-16.627,0-30.628,14.001-30.628,30.628s14.001,30.628,30.628,30.628
		s30.628-14.001,30.628-30.628S204.843,113.906,188.216,113.906z M91.957,113.906c-16.627,0-30.628,14.001-30.628,30.628
		s14.001,30.628,30.628,30.628s30.628-14.001,30.628-30.628S108.583,113.906,91.957,113.906z"/>
	<path style="fill:#324D5B;" d="M188.216,131.408c-7.001,0-13.126,6.126-13.126,13.126c0,7.001,6.126,13.126,13.126,13.126
		s13.126-6.126,13.126-13.126C201.342,137.533,195.217,131.408,188.216,131.408z M91.957,131.408
		c-7.001,0-13.126,6.126-13.126,13.126c0,7.001,6.126,13.126,13.126,13.126c7.001,0,13.126-6.126,13.126-13.126
		C105.083,137.533,98.957,131.408,91.957,131.408z"/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`;
}

// const elTest = document.querySelector('.test');
// elTest.innerHTML = ghostSVG('red');
