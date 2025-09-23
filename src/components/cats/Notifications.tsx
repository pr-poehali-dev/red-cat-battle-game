import React from 'react'

interface NotificationsProps {
  levelUpMessage: string | null
  expGainMessage: string | null
}

const Notifications: React.FC<NotificationsProps> = ({ levelUpMessage, expGainMessage }) => {
  return (
    <>
      {levelUpMessage && (
        <div className="bg-gradient-to-r from-cosmic-purple/30 to-cosmic-cyan/30 border border-cosmic-purple/50 rounded-lg p-3 text-center">
          <p className="text-white font-semibold">{levelUpMessage}</p>
        </div>
      )}

      {expGainMessage && (
        <div className="bg-blue-500/20 border border-blue-500/40 rounded-lg p-3 text-center">
          <p className="text-blue-300 font-semibold">{expGainMessage}</p>
        </div>
      )}
    </>
  )
}

export default Notifications