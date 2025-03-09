import { Box, Typography, TextField, Button } from '@mui/material';

interface OrderFormData {
  name: string;
  phone: string;
  address: string;
}

interface OrderFormProps {
  formData: OrderFormData;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const OrderForm = ({ formData, onFormChange, onSubmit }: OrderFormProps) => {
  return (
    <Box component="form" onSubmit={onSubmit} sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Delivery information
      </Typography>
      <TextField
        fullWidth
        required
        label="Name"
        name="name"
        value={formData.name}
        onChange={onFormChange}
        margin="normal"
      />
      <TextField
        fullWidth
        required
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={onFormChange}
        margin="normal"
      />
      <TextField
        fullWidth
        required
        label="Address"
        name="address"
        value={formData.address}
        onChange={onFormChange}
        margin="normal"
        multiline
        rows={3}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        sx={{ mt: 3 }}
      >
        Confirm order
      </Button>
    </Box>
  );
};

export default OrderForm; 