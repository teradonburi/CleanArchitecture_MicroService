import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions } from 'material-ui'

const Diag = ({open, title, content, action, onClose}) => (
  <Dialog open={!!open} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{content}</DialogContent>
    { action && <DialogActions>{action}</DialogActions>}
  </Dialog>
)

export default Diag