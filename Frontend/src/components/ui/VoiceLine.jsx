import React, { useEffect, useRef, useState } from "react";

const VoiceWave = () => {
  const [volume, setVolume] = useState(0);
  const animationRef = useRef(null);
  const audioCtxRef = useRef(null);
  const micRef = useRef(null);

  useEffect(() => {
    const detectSpeech = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        micRef.current = stream;

        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        audioCtxRef.current = audioCtx;

        if (audioCtx.state !== "running") await audioCtx.resume();

        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        source.connect(analyser);

        const checkVolume = () => {
          analyser.getByteFrequencyData(dataArray);
          const avg = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
          setVolume(avg);
          animationRef.current = requestAnimationFrame(checkVolume);
        };

        checkVolume();
      } catch (err) {
        console.error("Microphone access denied or unavailable", err);
      }
    };

    detectSpeech();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (micRef.current) micRef.current.getTracks().forEach((t) => t.stop());
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  // Convert volume to wave heights
  const barCount = 16;
  const bars = Array.from({ length: barCount }).map((_, i) => {
    const randomFactor = Math.sin(i + volume / 10);
    const height = Math.max(4, Math.min(40, (volume / 2) * randomFactor + 20));
    return height;
  });

  return (
    <div className="flex items-center justify-center mt-10 h-16 space-x-1">
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-1 bg-purple-500 rounded"
          style={{
            height: `${h}px`,
            transition: "height 0.15s ease-in-out",
          }}
        />
      ))}
    </div>
  );
};

export default VoiceWave;
