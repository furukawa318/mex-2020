// ページの読み込みを待つ
window.addEventListener('load', init);

function init() {
  
  //　const new名前 = で使えるようにする
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

  // サイズを指定
  //const width = 960;
  //const height = 540;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
  camera.position.set(0, 0, +1000);

  // 壁を作成
  const geometry = new THREE.PlaneGeometry(100, 100, 100);
  const material = new THREE.MeshBasicMaterial({color: 0xFF0000, side:THREE.DoubleSide});
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  const geometry2 = new THREE.PlaneGeometry(100, 100, 100);
  const material2 = new THREE.MeshBasicMaterial({color: 0xFF0000, side:THREE.DoubleSide});
  const plane2 = new THREE.Mesh(geometry2, material2);
  plane2.position.set(110,0,0);
  scene.add(plane2);

  const geometry3 = new THREE.PlaneGeometry(100, 100, 100);
  const material3 = new THREE.MeshBasicMaterial({color: 0xFF0000, side:THREE.DoubleSide});
  const plane3 = new THREE.Mesh(geometry3, material3);
  plane3.position.set(-110,0,0);
  scene.add(plane3);

  tick();

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    plane.rotation.y += 0.01;

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

