import React, { Fragment, useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import SliderImageItems from "./SliderImageItems";
import { UpdateProducts } from "../../../@core/services/api/put-api";
import { useMutation } from "@tanstack/react-query";
import { Button } from "reactstrap";
import { Camera } from "react-feather";

const EditSliders = ({ id, images, refetch }) => {
  const [pic, setPic] = useState([]);

  useEffect(() => {
    setPic(images);
  }, [images]);

  const { mutate } = useMutation({
    mutationKey: ["ACTIVE_OR_DEACTIVE"],
    mutationFn: (res) => {
      UpdateProducts(id, { pictureList: res }, refetch);
    },
  });

  // تابع برای تغییر ترتیب آیتم‌ها
  const handleSort = (newItems) => {
    setPic(newItems);
  };

  // Handle Replace Items
  const replaceItems = (id, newItem) => {
    const updateItems = pic.map((item) => (item.id === id ? newItem : item));
    setPic(updateItems);
  };

  // Handle Active Or Deactivate
  const handleActiveOrDeactivate = (id) => {
    let choosePic = pic.find((item) => item.id == id);
    if (choosePic.isActive) {
      choosePic.isActive = false;
    } else choosePic.isActive = true;

    // Replace
    replaceItems(choosePic.id, choosePic);
  };

  // Handle Delete Image
  const handleDelete = (id) => {
    let choosePic = pic.filter((item) => item.id != id);
    setPic(choosePic);
  };

  // Handle Add Image
  const handleAddImage = async (ev) => {
    // const res = await UploadImage(ev.target.files[0])
    // console.log(res)
    // setPic(...pic, { id: pic.length++, isActive: true, href: res.link });
  };

  return (
    <Fragment>
      <div className="d-flex justify-content-between align-items-center mb-2 mt-3">
        <div className="fs-2" style={{ paddingLeft: "10px" }}>
          ویرایش اسلایدر
        </div>
        <hr className="my-auto flex-grow-1" />
        <input
          id="image1"
          type="file"
          style={{ display: "none" }}
          multiple
          onChange={(e) => {
            handleAddImage(e);
          }}
        />
        <Button color="primary" className="my-2" style={{ padding: "0px" }}>
          <label
            htmlFor="image1"
            className="d-flex justify-content-center gap-75 p-1 cursor-pointer"
          >
            <span className="align-middle d-sm-inline-block d-none">
              افزودن عکس
            </span>
            <Camera size={16} />
          </label>
        </Button>
      </div>
      <ReactSortable list={pic} setList={handleSort} tag="div">
        {pic?.map((item) => (
          <SliderImageItems
            key={item.id}
            id={item.id}
            src={item.href}
            isActive={item.isActive}
            ActiveFunc={handleActiveOrDeactivate}
            DeleteFunc={handleDelete}
          />
        ))}
      </ReactSortable>
      <Button
        onClick={() => {
          mutate(pic);
        }}
        className="w-100 mb-4"
        color="primary"
      >
        ثبت تغییرات
      </Button>
    </Fragment>
  );
};

export default EditSliders;
