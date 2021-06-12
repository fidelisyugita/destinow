let _loader;

export function setLoaderInstance(loader) {
  _loader = loader;
}

export function showLoader() {
  if (_loader) {
    _loader.show();
  }
}

export function hideLoader() {
  if (_loader) {
    _loader.hide();
  }
}
