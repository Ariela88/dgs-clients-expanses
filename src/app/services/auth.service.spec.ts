import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { DatasharingService } from './datasharing.service';

describe('AuthService', () => {
  let authService: AuthService;
  let dataSharingServiceMock: jasmine.SpyObj<DatasharingService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('DatasharingService', ['notifyAuthenticated']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: DatasharingService, useValue: spy }
      ]
    });

    authService = TestBed.inject(AuthService);
    dataSharingServiceMock = TestBed.inject(DatasharingService) as jasmine.SpyObj<DatasharingService>;
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should authenticate a user with correct credentials', () => {
    const email = 'test@example.com';
    const password = 'password123';
    const clients = [
      { email: 'test@example.com', password: 'password123', role: 'user' }
    ];

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(clients));
    spyOn(localStorage, 'setItem');

    const result = authService.authenticate(email, password);

    expect(result).toBe(true);
    expect(authService.isAuthenticatedSubject.value).toBe(true);
    expect(dataSharingServiceMock.notifyAuthenticated).toHaveBeenCalledWith(jasmine.objectContaining({ email }));
    expect(authService.loggedInUserEmailSubject.value).toBe(email);
  });

  it('should not authenticate a user with incorrect credentials', () => {
    const email = 'test@example.com';
    const password = 'wrongpassword';
    const clients = [
      { email: 'test@example.com', password: 'password123', role: 'user' }
    ];

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(clients));
    spyOn(localStorage, 'setItem');

    const result = authService.authenticate(email, password);

    expect(result).toBe(false);
    expect(authService.isAuthenticatedSubject.value).toBe(false);
    expect(dataSharingServiceMock.notifyAuthenticated).not.toHaveBeenCalled();
    expect(authService.loggedInUserEmailSubject.value).toBe(undefined);
  });

  it('should logout a user', () => {
    authService.logout();

    expect(authService.isAuthenticatedSubject.value).toBe(false);
    expect(authService.loggedInUserEmailSubject.value).toBe(undefined);
  });

  
});
