export function removeObject3D(object) {
  object.clear();

  if (object.geometry) object.geometry.dispose();

  if (object.material) {
    if (object.material instanceof Array) {
      // for better memory management and performance
      object.material.forEach((material) => material.dispose());
    } else {
      // for better memory management and performance
      object.material.dispose();
    }
  }

  object.removeFromParent();
  object = undefined; // the parent might be the scene or another object, but it is sure to be removed this way
  renderer.renderLists.dispose();
}
