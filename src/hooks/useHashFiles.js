import {useCallback, useRef, useState} from "react";
import { blake2AsHex } from "@polkadot/util-crypto";

function getHash(data) {
  return blake2AsHex(data);
}


export const useHashFiles = () => {
  const _ref = useRef(null);
  const [hashs, setHashs] = useState([]);
  const [files, setFiles] = useState([]);

  const ref = useCallback(input => {

    if (input) {
      input.addEventListener("change", () => {
        const files = _ref.current.files;
        setFiles(files);
        for (let i = 0; i < files.length; i++) {
          const file = files.item(i);
          console.log(file)
          const fileReader = new FileReader();
          fileReader.readAsText(file);
          fileReader.addEventListener("loadend", async () => {
            const hash = await getHash(fileReader.result);
            setHashs(hashs => [...hashs, hash]);
          });
        }
      });

    }

    _ref.current = input;
  }, [])


  return({
    ref,
    hashs,
    files
  });
}