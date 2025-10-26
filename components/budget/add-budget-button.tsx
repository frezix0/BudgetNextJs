type AddBudgetButtonProps = {
  onClick: () => void
}

export default function AddBudgetButton({ onClick }: AddBudgetButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        height: '120px',
        borderRadius: '1.5rem',
        backgroundColor: 'transparent',
        fontSize: '3rem',
        fontWeight: '700',
        border: '2px dashed rgba(217, 217, 217, 0.5)',
        color: 'rgba(217, 217, 217, 0.7)',
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onMouseEnter={(e) => {
        const cardColor = getComputedStyle(document.documentElement)
          .getPropertyValue('--primary-card-bg').trim()
        e.currentTarget.style.borderColor = cardColor
        e.currentTarget.style.color = cardColor
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(217, 217, 217, 0.5)'
        e.currentTarget.style.color = 'rgba(217, 217, 217, 0.7)'
      }}
    >
      +
    </button>
  )
}