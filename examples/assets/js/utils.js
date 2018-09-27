/**
 * シェーダソースのテキスト情報取得
 * @param {string} url - 取得するシェーダーファイルのパス 
 * @param {function} callback - 成功時のコールバック
 */
function fetchSource(url, callback){
  fetch(url)
    .then( (res) => {
      return res.text()
    })
    .then( (text) => {
      if(callback) callback(text)
    })
}


function createShader(gl, type, source){
  let shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if(success) return shader
  console.log(gl.getShaderInfoLog(shader))
  gl.deleteShader(shader)
}


function createProgram(gl, vs, fs){
  let program = gl.createProgram()
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  let success = gl.getProgramParameter(program, gl.LINK_STATUS)
  if(success) return program
  console.log(gl.getProgramInfoLog(program))
  gl.deleteProgram(program)
}

/**
 * サイズセット
 * @param {object} gl - WebGLRenderingContext 
 */
function setSize(gl){
  resize(gl)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
}

/**
 * windowサイズに合わせてリサイズ
 * @param {object} gl - WebGLRenderingContext 
 */
function resize(gl){
  let realToCSSPixels = window.devicePixelRatio
  let displayW = Math.floor(gl.canvas.clientWidth * realToCSSPixels)
  let displayH = Math.floor(gl.canvas.clientHeight * realToCSSPixels)
  if(gl.canvas.width !== displayW || gl.canvas.height !== displayH){
    gl.canvas.width = displayW
    gl.canvas.height = displayH
  }
}