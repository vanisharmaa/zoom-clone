"use client";

import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (isSetupComplete: boolean) => void;
}) => {
  const [isMicToggledOn, setIsMicToggledOn] = useState(false); // false means mic and cam are on
  const [isCameraToggledOn, setIsCameraToggledOn] = useState(false);
  const call = useCall();

  if (!call)
    throw new Error("useCall must be used within StreamCAll component");

  useEffect(() => {
    if (isMicToggledOn) call?.microphone.disable();
    else call?.microphone.enable();
    if (isCameraToggledOn) call?.camera.disable();
    else call?.camera.enable();
  }, [call?.camera, call?.microphone, isMicToggledOn, isCameraToggledOn]);

  const joinMeeting = () => {
    call?.join();
    setIsSetupComplete(true);
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3 mt-2">
        <label
          className="flex items-center justify-center gap-2 font-medium"
          htmlFor=""
        >
          <input
            type="checkbox"
            name=""
            id=""
            checked={isMicToggledOn}
            onChange={(e) => setIsMicToggledOn(e.target.checked)}
          />
          Join with mic off
        </label>
        <label
          className="flex items-center justify-center gap-2 font-medium"
          htmlFor=""
        >
          <input
            type="checkbox"
            name=""
            id=""
            checked={isCameraToggledOn}
            onChange={(e) => setIsCameraToggledOn(e.target.checked)}
          />
          Join with camera off
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={joinMeeting}
      >
        Join Meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
