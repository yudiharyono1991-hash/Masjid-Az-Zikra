import React, { useState, useEffect } from 'react';
import { Compass, AlertTriangle, Info } from 'lucide-react';

export const QiblaCompass: React.FC = () => {
  const [heading, setHeading] = useState<number | null>(null);
  const [qiblaAngle, setQiblaAngle] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Mecca coordinates
  const MECCA_LAT = 21.4225;
  const MECCA_LNG = 39.8262;

  const calculateQibla = (lat: number, lng: number) => {
    // Math to calculate Qibla angle from given lat/lng
    const latRad = lat * (Math.PI / 180);
    const lngRad = lng * (Math.PI / 180);
    const meccaLatRad = MECCA_LAT * (Math.PI / 180);
    const meccaLngRad = MECCA_LNG * (Math.PI / 180);

    const y = Math.sin(meccaLngRad - lngRad);
    const x = Math.cos(latRad) * Math.tan(meccaLatRad) - Math.sin(latRad) * Math.cos(meccaLngRad - lngRad);
    let qibla = Math.atan2(y, x) * (180 / Math.PI);
    
    qibla = (qibla + 360) % 360;
    setQiblaAngle(qibla);
  };

  const requestPermission = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permissionState = await (DeviceOrientationEvent as any).requestPermission();
        if (permissionState === 'granted') {
          setPermissionGranted(true);
          initCompass();
        } else {
          setError('Izin sensor ditolak. Aktifkan izin sensor gerak di pengaturan browser Anda.');
        }
      } catch (err) {
        setError('Gagal meminta izin sensor. Pastikan menggunakan koneksi aman (HTTPS).');
      }
    } else {
      // Non-iOS 13+ devices
      setPermissionGranted(true);
      initCompass();
    }
  };

  const initCompass = () => {
    if (!navigator.geolocation) {
      setError('Geolocation tidak didukung oleh browser ini.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        calculateQibla(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        setError('Tidak dapat melacak lokasi Anda. Aktifkan GPS / Izin Lokasi.');
      }
    );

    const handleOrientation = (event: DeviceOrientationEvent) => {
      let compassHeading = null;
      if ((event as any).webkitCompassHeading) {
        // iOS
        compassHeading = (event as any).webkitCompassHeading;
      } else if (event.alpha !== null) {
        // Android
        // alpha is relative to device orientation, need absolute if possible.
        // For simplicity, we use absolute if absolute event is available.
        compassHeading = 360 - event.alpha; 
      }
      if (compassHeading !== null) {
        setHeading(compassHeading);
      }
    };

    if ('ondeviceorientationabsolute' in window) {
      window.addEventListener('deviceorientationabsolute', handleOrientation as any);
    } else if ('ondeviceorientation' in window) {
      window.addEventListener('deviceorientation', handleOrientation);
    } else {
      setIsSupported(false);
      setError('Sensor kompas tidak didukung di perangkat ini.');
    }

    return () => {
      window.removeEventListener('deviceorientationabsolute', handleOrientation as any);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  };

  useEffect(() => {
    // If not iOS 13+, we can auto-init if we want, but better to wait for user click to be safe with audio/sensors
  }, []);

  if (!isSupported) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-center">
        <AlertTriangle className="w-8 h-8 text-rose-500 mx-auto mb-2" />
        <p className="text-sm text-rose-700 font-bold">Perangkat Tidak Didukung</p>
        <p className="text-xs text-rose-600 mt-1">Perangkat atau browser Anda tidak memiliki sensor kompas.</p>
      </div>
    );
  }

  const getCompassRotation = () => {
    if (heading === null) return 0;
    return -heading;
  };

  const isFacingQibla = heading !== null && qiblaAngle !== null && Math.abs((heading - qiblaAngle + 360) % 360) < 10 || Math.abs((heading - qiblaAngle - 360) % 360) < 10;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      <div className="bg-emerald-900 text-white p-4 flex items-center justify-between">
        <h3 className="font-bold font-serif flex items-center gap-2">
          <Compass className="w-5 h-5 text-emerald-400" />
          Kompas Kiblat
        </h3>
      </div>
      <div className="p-6 flex flex-col items-center justify-center min-h-[300px]">
        
        {error ? (
          <div className="text-center text-rose-600 bg-rose-50 p-4 rounded-xl border border-rose-100">
            <AlertTriangle className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm font-bold">{error}</p>
            {!permissionGranted && (
              <button onClick={requestPermission} className="mt-3 bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-rose-700">
                Coba Lagi
              </button>
            )}
          </div>
        ) : !permissionGranted ? (
          <div className="text-center">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Compass className="w-12 h-12 text-emerald-600" />
            </div>
            <p className="text-sm text-gray-600 mb-4 max-w-xs mx-auto">
              Fitur ini memerlukan akses Sensor Gerak/Orientasi dan Lokasi GPS Anda untuk menentukan arah kiblat.
            </p>
            <button 
              onClick={requestPermission}
              className="bg-emerald-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg hover:bg-emerald-700 transition"
            >
              Aktifkan Kompas
            </button>
            <p className="text-[10px] text-gray-400 mt-4 flex items-center justify-center gap-1">
              <Info className="w-3 h-3" /> Pastikan Anda menggunakan HTTPS
            </p>
          </div>
        ) : (
          <div className="relative flex flex-col items-center">
            
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full border-4 border-emerald-100 shadow-inner flex items-center justify-center bg-gray-50"
                 style={{ transform: \`rotate(\${getCompassRotation()}deg)\`, transition: 'transform 0.1s ease-out' }}>
              
              {/* Compass markings */}
              <div className="absolute top-2 text-rose-500 font-bold text-sm">U</div>
              <div className="absolute bottom-2 text-gray-400 font-bold text-sm">S</div>
              <div className="absolute right-2 text-gray-400 font-bold text-sm">T</div>
              <div className="absolute left-2 text-gray-400 font-bold text-sm">B</div>

              {/* Center dot */}
              <div className="w-4 h-4 bg-emerald-800 rounded-full z-10 shadow-sm border-2 border-white"></div>

              {/* Qibla Indicator (Kaaba) relative to North */}
              {qiblaAngle !== null && (
                <div 
                  className="absolute inset-0 flex items-start justify-center z-20 pointer-events-none"
                  style={{ transform: \`rotate(\${qiblaAngle}deg)\` }}
                >
                  <div className="-mt-3 flex flex-col items-center">
                    <div className="w-6 h-6 bg-black border border-yellow-500 shadow-lg transform rotate-45 flex items-center justify-center">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Static top indicator line for phone heading */}
            <div className="absolute top-0 w-1 h-6 bg-rose-500 -mt-2 shadow-sm rounded-full z-30"></div>

            <div className="mt-8 text-center">
              {heading === null ? (
                <p className="text-emerald-600 font-bold animate-pulse">Menyelaraskan sensor...</p>
              ) : (
                <>
                  <p className="text-3xl font-bold font-mono text-emerald-950">
                    {Math.round(heading)}°
                  </p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Derajat Kompas</p>
                  
                  {isFacingQibla && (
                    <div className="mt-4 inline-block bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce">
                      Anda menghadap Kiblat!
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
