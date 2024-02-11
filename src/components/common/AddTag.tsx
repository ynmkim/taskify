import React, { KeyboardEvent, useState } from 'react';
import { useForm, ControllerRenderProps } from 'react-hook-form';
import { Chip } from '@/components/ui/tag'; // Chip 컴포넌트와 tagVariants 가져오기
import Label from '@/components/common/Label';
import { FormField } from '@/components/ui/form';

interface FormValues {
  tagInput: string;
}

interface AddTagProps {
  onTagListChange: (tags: string[]) => void;
  tags?: string[];
}

const AddTag = ({ onTagListChange, tags }: AddTagProps) => {
  const [tagList, setTagList] = useState(tags ? tags : []);

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { tagInput: '' }, mode: 'onBlur' });

  function calculateLength(value: string) {
    let length = 0;
    for (let i = 0; i < value.length; i++) {
      const char = value.charCodeAt(i);
      if (char > 127) {
        // 한글
        length += 2;
      } else {
        // 영문
        length += 1;
      }
    }
    return length;
  }
  const hasError = Boolean(errors.tagInput);

  const updateTagList = (newTags: string[]) => {
    setTagList(newTags);
    onTagListChange(newTags);
  };

  const submitTagItem = (data: FormValues) => {
    if (tagList.length >= 10) {
      setError('tagInput', {
        type: 'manual',
        message: '태그는 10개까지 입력 가능합니다',
      });
      return;
    }
    const regex = /^[가-힣A-Za-z0-9]+$/;
    const validTag = regex.test(data.tagInput);
    if (!validTag) {
      setError('tagInput', {
        type: 'manual',
        message: '태그는 한글, 영문, 숫자만 사용할 수 있습니다',
      });
      return;
    }
    if (tagList.includes(data.tagInput)) {
      setError('tagInput', {
        type: 'manual',
        message: '중복된 태그입니다',
      });
      return;
    }
    clearErrors('tagInput');
    updateTagList([...tagList, data.tagInput]);
    reset({ tagInput: '' });
  };

  const deleteTagItem = (tagToDelete: string) => {
    const newTagList = tagList.filter((tag) => tag !== tagToDelete);
    updateTagList(newTagList);
  };

  const onKeyDown = (field: ControllerRenderProps<FormValues, 'tagInput'>, e: KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(submitTagItem)();
    }
    if (e.key === 'Backspace' && !field.value) {
      e.preventDefault();
      if (tagList.length > 0) {
        const newTagList = tagList.slice(0, tagList.length - 1);
        updateTagList(newTagList);
      }
    }
  };

  return (
    <div>
      <Label text="태그" />
      <div
        className={`flex items-center flex-wrap border w-full  ${
          hasError ? 'border-red-D6173A' : 'border-gray-D9D9D9'
        } rounded-md  px-[16px] h-[42px] md:h-12`}
      >
        {tagList.slice(0, 10).map((tag, index) => (
          <div key={index} className="h-[50px] flex items-center mr-[6px]">
            <Chip size="small" variant="basic" color="orange" onClick={() => deleteTagItem(tag)}>
              {tag}
            </Chip>
          </div>
        ))}
        <FormField
          name="tagInput"
          control={control}
          rules={{
            validate: (value) => calculateLength(value) <= 16 || '태그는 한글 8자 또는 영문 16자 이하로 작성해주세요',
          }}
          render={({ field }) => (
            <div>
              <input
                {...field}
                type="text"
                placeholder="입력 후 Enter"
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => onKeyDown(field, e)}
                className=" border-none focus:outline-none text-[14px] md:text-[16px] placeholder:text-gray-9FA6B2"
              />
            </div>
          )}
        />
      </div>
      <div className="text-[14px] text-red-D6173A mt-[8px]">{errors.tagInput && <p>{errors.tagInput.message}</p>}</div>
    </div>
  );
};

export default AddTag;

// import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useRef } from "react";
// import styles from "./TagInput.module.css";
// import TagList from "./TagList";

// interface TagInputProp {
//   tagList: string[];
//   setTagList: Dispatch<SetStateAction<string[]>>;
//   value: string;
//   id: string;
//   setValue: Dispatch<SetStateAction<string>>;
//   onChange: (e: ChangeEvent<HTMLInputElement>) => void;
// }

// function TagInput({ tagList, setTagList, value, setValue, onChange, id }: TagInputProp) {
//   const inputRef = useRef<HTMLInputElement>(null);

//   const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
//     const trimmedValue = value.trim(); // 문자열의 앞뒤 공백만 제거
//     const replacedValue = value.replace(/\s/g, ""); // 문자열 사이사이의 공백 제거

//     // 공백 문자열을 태그로 입력하는 것 방지
//     if (event.key === "Enter" && replacedValue !== "") {
//       event.preventDefault();
//       const isAlreadyInList = tagList.find((tag) => tag === trimmedValue); // 중복된 태그 입력 방지

//       if (!isAlreadyInList) {
//         setTagList((prevList) => {
//           return [trimmedValue, ...prevList];
//         });
//       }

//       setValue("");
//     }

//     if (event.key === "Backspace" && value === "") {
//       setTagList((prevList) => {
//         const updatedList = [...prevList]; // 이전 배열을 복제합니다.
//         updatedList.shift(); // 첫 번째 요소를 제거합니다.
//         return updatedList;
//       });
//     }
//   };

//   const handleClick = (tag: string) => {
//     setTagList((prevList) => {
//       const newList = prevList.filter((item) => item !== tag);

//       return [...newList];
//     });
//   };

//   const placeholder = tagList.length !== 0 ? "" : "입력 후 Enter";

//   return (
//     <>
//       <div className={styles.root}>
//         {tagList[0] && (
//           <div className={styles.tagContainer}>
//             {tagList.map((tag) => (
//               <TagList tag={tag} onClick={handleClick} key={tag} />
//             ))}
//           </div>
//         )}
//         <input
//           id={id}
//           ref={inputRef}
//           className={styles.input}
//           value={value}
//           onChange={onChange}
//           onKeyDown={handleEnter}
//           placeholder={placeholder}
//         ></input>
//       </div>
//     </>
//   );
// }

// export default TagInput;
