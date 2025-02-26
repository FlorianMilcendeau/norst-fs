#![deny(clippy::all)]

use napi::{bindgen_prelude::*, tokio::fs};

#[macro_use]
extern crate napi_derive;

#[napi]
async fn read_file_async(path: String) -> Result<Buffer> {
  match fs::read(path).await {
    Ok(value) => Ok(value.into()),
    Err(error) => Err(Error::new(
      Status::GenericFailure,
      format!("failed to read file, {}", error),
    )),
  }
}

#[napi]
fn read_file(path: String) -> Result<Buffer> {
  match std::fs::read(path) {
    Ok(value) => Ok(value.into()),
    Err(error) => Err(Error::new(
      Status::GenericFailure,
      format!("failed to read file, {}", error),
    )),
  }
}

#[napi]
fn write_file(path: String, contents: Buffer) -> Result<()> {
  match std::fs::write(path, contents) {
    Ok(_) => Ok(()),
    Err(error) => Err(Error::new(
      Status::GenericFailure,
      format!("failed to write file, {}", error),
    )),
  }
}

#[napi]
async fn write_file_async(path: String, contents: Buffer) -> Result<()> {
  match fs::write(path, contents).await {
    Ok(_) => Ok(()),
    Err(error) => Err(Error::new(
      Status::GenericFailure,
      format!("failed to write file, {}", error),
    )),
  }
}
