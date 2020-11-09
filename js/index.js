// ページの読み込みを待つ
window.addEventListener('load', init);

function init() {
  
  //　const 新しい名前 = で使えるようにする
  const cartElement = document.querySelector('.cart');
  console.log(cartElement);

  const BtnCart = document.querySelector('.btn-cart');
  console.log(BtnCart);

  //　動作指定
  BtnCart.addEventListener("click", () =>{
    console.log("ボタンがクリックされました");
    cartElement.classList.toggle('cart-open');
  });

  const descriptionElement = document.querySelector('.description');
  console.log(descriptionElement);

  const BtnDescription = document.querySelector('.btn-description');
  console.log(BtnDescription);

  BtnDescription.addEventListener("click",() =>{
    console.log("ボタンがクリックされました");
    descriptionElement.classList.toggle('description-open');
  });

  const mouse = new THREE.Vector2();

  const canvas = document.querySelector('#myCanvas');

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);

  const light = new THREE.AmbientLight(0xFFFFFF, 1.0);
  scene.add(light);

  // 壁を作成
  const geometry = new THREE.PlaneGeometry(200, 100, 100);
  const material = new THREE.MeshBasicMaterial({color: 0xFFFFFF, side:THREE.DoubleSide});
  const plane = new THREE.Mesh(geometry, material);
  plane.position.set(0, 0, -25);
  scene.add(plane);

  const geometry2 = new THREE.PlaneGeometry(150, 100, 100);
  const material2 = new THREE.MeshBasicMaterial({color: 0xFFFFFF, side:THREE.DoubleSide});
  const plane2 = new THREE.Mesh(geometry2, material2);
  plane2.position.set(100, 0, 50);
  plane2.rotation.y = 1.5708;
  scene.add(plane2);

  const geometry3 = new THREE.PlaneGeometry(150, 100, 100);
  const material3 = new THREE.MeshBasicMaterial({color: 0xFFFFFF, side:THREE.DoubleSide});
  const plane3 = new THREE.Mesh(geometry3, material3);
  plane3.position.set(-100, 0, 50);
  plane3.rotation.y = 1.5708;
  scene.add(plane3);

  const geometry4 = new THREE.PlaneGeometry(200, 150, 100);
  const material4 = new THREE.MeshBasicMaterial({color: 0xFFFFFF, side:THREE.DoubleSide});
  const plane4 = new THREE.Mesh(geometry4, material4);
  plane4.position.set(0, -50, 50);
  plane4.rotation.x = 1.5708;
  scene.add(plane4);

  const meshList = [];
  for (let i = 0; i< 4; i++) {
    const geometry5 = new THREE.PlaneGeometry(20, 50, 10);
    const material5 = new THREE.MeshBasicMaterial({color: 	
    0x00FF00, side:THREE.DoubleSide});
    const panel = new THREE.Mesh(geometry5, material5);
    scene.add(panel)

    panel.position.set(-60 + 40 *i, 0, -20);
    
    meshList.push(panel);
  };

  const raycaster = new THREE.Raycaster();

  canvas.addEventListener('mousemove', handleMouseMove);

  tick();

  function handleMouseMove(event) {
    const element = event.currentTarget;
    // canvas要素上のXY座標
    const x = event.clientX - element.offsetLeft;
    const y = event.clientY - element.offsetTop;
    // canvas要素の幅・高さ
    const w = element.offsetWidth;
    const h = element.offsetHeight;

    // -1〜+1の範囲で現在のマウス座標を登録する
    mouse.x = (x / w) * 2 - 1;
    mouse.y = -(y / h) * 2 + 1;
  }


  // 毎フレーム時に実行されるループイベントです
  function tick() {
    camera.position.x = 0 * Math.sin(Date.now() / 3000);
    camera.position.y = 0;
    camera.position.z = 500
    // 原点方向を見つめる
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    raycaster.setFromCamera(mouse, camera);

    // その光線とぶつかったオブジェクトを得る
    const intersects = raycaster.intersectObjects(meshList);

    meshList.map(panel => {
      // 交差しているオブジェクトが1つ以上存在し、
      // 交差しているオブジェクトの1番目(最前面)のものだったら
      if (intersects.length > 0 && panel === intersects[0].object) {
        // 色を赤くする
        panel.material.color.setHex(0xff0000);
      } else {
        // それ以外は元の色にする
        panel.material.color.setHex(0x00FF00);
      }
    });

    // レンダリング
    renderer.render(scene, camera); 

    requestAnimationFrame(tick);
  }

  //初期化のために実行
  //リサイズ発生時に実行
  onResize();
  window.addEventListener('resize', onResize);

  function onResize(){
    //サイズ取得
    const width = window.innerWidth;
    const height = window.innerHeight;

    //レンダラーのサイズを調整
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    //カメラのアスペクト比をただす
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

  }
}

