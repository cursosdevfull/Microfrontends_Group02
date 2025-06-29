# Patients Microfrontend

This is the patients management microfrontend for the medical system. It provides comprehensive patient management functionality including CRUD operations, search, and filtering.

## Features

### ✅ Completed
- **Patient List Display**: Modern card-based layout showing patient information
- **Patient Data Structure**: Matches backend PatientEntity with all required fields
- **Search & Filtering**: Search by name, email, phone, or address
- **Patient Service**: Service layer for API communication (currently with mock data)
- **CRUD Operations**: Create, Read, Update, Delete functionality
- **Patient Form**: Modal form for adding and editing patients with validation
- **Responsive Design**: Mobile-friendly layout
- **Modern UI**: Professional medical theme with gradients and animations

### 📋 Patient Data Fields
- Patient ID
- First Name & Last Name
- Age & Gender
- Email & Phone Number
- Address
- Created At & Updated At timestamps

### 🎨 UI Components
1. **Patient List**: Card-based display with patient avatars and detailed information
2. **Search Box**: Real-time search with multiple field support
3. **Patient Form**: Modal form with comprehensive validation
4. **Action Buttons**: Edit and delete functionality with confirmation

### 🔧 Technical Implementation
- **Angular 19+** with standalone components
- **Reactive Forms** with validation
- **TypeScript** with proper interfaces and DTOs
- **RxJS** for reactive programming
- **HttpClient** ready for backend integration
- **CSS Grid & Flexbox** for responsive layouts

## File Structure
```
src/app/
├── app.component.ts           # Main patients list component
├── app.component.html         # Patient list template
├── app.component.css          # Modern styling with medical theme
├── patient.service.ts         # Patient service with API methods
├── patient-form.component.ts  # Modal form for CRUD operations
└── app.config.ts             # App configuration with HttpClient
```

## Getting Started

### Prerequisites
- Node.js 18+
- Angular CLI 19+

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

## API Integration

The service is prepared for backend integration. To connect to the real API:

1. Update `PatientService.apiUrl` in `patient.service.ts`
2. Uncomment the HTTP calls in service methods
3. Remove or modify mock data as needed

### Example API Endpoints
- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get patient by ID
- `POST /api/patients` - Create new patient
- `PATCH /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

## Form Validation

The patient form includes comprehensive validation:
- **Required Fields**: All fields are required
- **Email Format**: Valid email format required
- **Phone Format**: Valid phone number pattern
- **Age Range**: 1-120 years
- **Name Length**: Minimum 2 characters
- **Address Length**: Minimum 10 characters

## Responsive Design

The component is fully responsive with breakpoints:
- **Desktop**: Full layout with side-by-side form fields
- **Tablet**: Stacked form fields, maintained card layout
- **Mobile**: Single column layout, simplified patient cards

## Future Enhancements

### 🚀 Planned Features
- **Pagination**: Handle large patient lists
- **Advanced Filtering**: Filter by age, gender, registration date
- **Export Functionality**: Export patient data to CSV/PDF
- **Bulk Operations**: Select and delete multiple patients
- **Patient Photos**: Upload and display patient photos
- **Medical History Integration**: Link to patient medical histories
- **Real-time Updates**: WebSocket integration for live updates

### 🔒 Security & Auth
- **Authentication**: User login and session management
- **Authorization**: Role-based access control
- **Data Encryption**: Secure patient data handling
- **Audit Trail**: Track all patient data changes

## Integration with Medical System

This microfrontend integrates with:
- **Backend API**: Node.js/TypeScript medical system
- **History Module**: Patient medical history management
- **Shell Application**: Main application container
- **Header Component**: Navigation and user management

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow Angular style guide
- Implement reactive forms for user input
- Use observables for async operations
- Add comprehensive error handling

### Testing
- Unit tests for components and services
- Integration tests for form validation
- E2E tests for user workflows

### Performance
- Lazy loading for large datasets
- OnPush change detection strategy
- Virtual scrolling for patient lists
- Image optimization for patient photos

## Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Test responsive design
5. Ensure accessibility compliance

## License

This project is part of the medical system microfrontend architecture.
