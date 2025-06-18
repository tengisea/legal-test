
import React from 'react';
import { X, Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react';
import { User } from '../types/chat';

interface VideoCallModalProps {
  user: User;
  onEndCall: () => void;
  callType: 'video' | 'audio';
}

export const VideoCallModal: React.FC<VideoCallModalProps> = ({
  user,
  onEndCall,
  callType
}) => {
  const [isMuted, setIsMuted] = React.useState(false);
  const [isVideoOff, setIsVideoOff] = React.useState(callType === 'audio');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-lg w-full max-w-4xl mx-4 overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-slate-800">
          <div className="flex items-center space-x-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="text-white font-medium">{user.name}</h3>
              <p className="text-slate-300 text-sm">
                {callType === 'video' ? 'Video Call' : 'Audio Call'}
              </p>
            </div>
          </div>
          
          <button
            onClick={onEndCall}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="h-96 bg-slate-800 flex items-center justify-center relative">
          {callType === 'video' && !isVideoOff ? (
            <div className="w-full h-full bg-slate-700 flex items-center justify-center">
              <p className="text-slate-400">Video feed would appear here</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full mb-4"
              />
              <h3 className="text-white text-xl font-medium">{user.name}</h3>
              <p className="text-slate-400">
                {callType === 'audio' ? 'Audio Call in Progress' : 'Video is off'}
              </p>
            </div>
          )}

          {/* User's video preview (small corner window) */}
          {callType === 'video' && !isVideoOff && (
            <div className="absolute bottom-4 right-4 w-32 h-24 bg-slate-600 rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                Your video
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-slate-800 flex justify-center space-x-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-full transition-colors ${
              isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-slate-600 hover:bg-slate-700'
            }`}
          >
            {isMuted ? (
              <MicOff className="w-6 h-6 text-white" />
            ) : (
              <Mic className="w-6 h-6 text-white" />
            )}
          </button>

          {callType === 'video' && (
            <button
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`p-4 rounded-full transition-colors ${
                isVideoOff ? 'bg-red-600 hover:bg-red-700' : 'bg-slate-600 hover:bg-slate-700'
              }`}
            >
              {isVideoOff ? (
                <VideoOff className="w-6 h-6 text-white" />
              ) : (
                <Video className="w-6 h-6 text-white" />
              )}
            </button>
          )}

          <button
            onClick={onEndCall}
            className="p-4 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
          >
            <PhoneOff className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
