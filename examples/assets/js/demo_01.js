( () => {

  const canvas = document.getElementById('c')
  const gl = canvas.getContext('webgl')

  let vertexShader, fragmentShader, program
  let positionAttributeLocation,
      resolutionUniformLocation,
      positionBuffer

  // let positions =[
  //   10, 20,
  //   80, 20,
  //   10, 30,
  //   10, 30,
  //   80, 20,
  //   80, 30
  // ]
  let positions = [
    0, 0,
    0, 0.5,
    0.7, 0
  ]

  if(!gl) console.log('webgl is not supported')

  main()

  function main(){
    setSize(gl)

    window.addEventListener('resize', () => {
      setSize(gl)
    }, false)

    // VSシェーダコードの取得、シェーダ作成
    fetchSource('./assets/shader/demo_01/vs.glsl', (vsData) => {
      // console.log(vsData) 
      vertexShader = createShader(gl, gl.VERTEX_SHADER, vsData);
        
      fetchSource('./assets/shader/demo_01/fs.glsl', (fsData) => {
        //   console.log(fsData) 
        fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsData);
        program = createProgram(gl, vertexShader, fragmentShader)

        positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
        resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution')

        positionBuffer = gl.createBuffer()

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

        gl.clearColor(0, 0, 0, 0)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.useProgram(program)

        gl.enableVertexAttribArray(positionAttributeLocation)
        gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
        let size = 2
        let type = gl.FLOAT
        let normalize = false
        let stride = 0
        let offset = 0
        let primitiveType = gl.TRIANGLES
        // let count = 6
        let count = 3

        gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset)
        gl.drawArrays(primitiveType, offset, count)
      })
    })    
  }


})()