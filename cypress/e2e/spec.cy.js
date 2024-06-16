
describe("login",()=>{

  it("",()=>{
    cy.visit("http://localhost:8081/auth/login/");
    cy.get('input[name="email"]').type('test1@test.com');
    cy.get('input[name="password"]').type('12345678');
    cy.get('button[type="submit"]').click();
  })

  it('should show an error for incorrect credentials', () => {
    cy.visit("http://localhost:8081/auth/login/");
    cy.get('input[name="email"]').type('wronguser@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid email or password').should('be.visible');
  });

})

describe('Signup', () => {


  describe('Valid Signup', () => {
    it('should allow a user to sign up with a valid user role', () => {
      cy.visit("http://localhost:8081/auth/signup");
      cy.get('input[name="username"]').type('Test User');
      cy.get('input[name="email"]').type('testuser@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('select[name="role"]').select('Member');
      cy.get('button[type="submit"]').click();
      // Optionally check for some text or element on the login page
      cy.contains('Login').should('be.visible');
    });

    it('should allow a user to sign up with a valid admin role', () => {
      cy.visit("http://localhost:8081/auth/signup");
      cy.get('input[name="username"]').type('Admin User');
      cy.get('input[name="email"]').type('adminuser@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('select[name="role"]').select('Admin');
      cy.get('button[type="submit"]').click();
      // Optionally check for some text or element on the login page
      cy.contains('Login').should('be.visible');
    });

    it('should allow a user to sign up with a valid doctor role', () => {
      cy.visit("http://localhost:8081/auth/signup");
      cy.get('input[name="username"]').type('Moderator User');
      cy.get('input[name="email"]').type('moderatoruser@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('select[name="role"]').select('Doctor');
      cy.get('button[type="submit"]').click();
      // Optionally check for some text or element on the login page
      cy.contains('Login').should('be.visible');
    });
  });

  describe('Invalid Signup', () => {
    it('should show an error message when name is missing', () => {
      cy.visit("http://localhost:8081/auth/signup");
      cy.get('input[name="email"]').type('testuser@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('select[name="role"]').select('Member');
      cy.get('button[type="submit"]').click();
    });

    it('should show an error message when email is missing', () => {
      cy.visit("http://localhost:8081/auth/signup");
      cy.get('input[name="username"]').type('Test User');
      cy.get('input[name="password"]').type('password123');
      cy.get('select[name="role"]').select('Member');
      cy.get('button[type="submit"]').click();
    });

    it('should show an error message when email format is invalid', () => {
      cy.visit("http://localhost:8081/auth/signup");
      cy.get('input[name="username"]').type('Test User');
      cy.get('input[name="email"]').type('invalid-email');
      cy.get('input[name="password"]').type('password123');
      cy.get('select[name="role"]').select('Member');
      cy.get('button[type="submit"]').click();
      cy.contains('Invalid value').should('be.visible');
    });

    it('should show an error message when password is missing', () => {
      cy.visit("http://localhost:8081/auth/signup");
      cy.get('input[name="username"]').type('Test User');
      cy.get('input[name="email"]').type('testuser@example.com');
      cy.get('select[name="role"]').select('Member');
      cy.get('button[type="submit"]').click();
    });

    it('should show an error message when password is too short', () => {
      cy.visit("http://localhost:8081/auth/signup");
      cy.get('input[name="username"]').type('Test User');
      cy.get('input[name="email"]').type('testuser@example.com');
      cy.get('input[name="password"]').type('short');
      cy.get('select[name="role"]').select('Member');
      cy.get('button[type="submit"]').click();
      cy.contains('Invalid value').should('be.visible');
    });

  });
});


//


describe('Self-Assessment Form', () => {
  beforeEach(() => {
    // Log in before each test
      cy.visit("http://localhost:8081/auth/login/");
      cy.get('input[name="email"]').type('test1@test.com');
      cy.get('input[name="password"]').type('12345678');
      cy.get('button[type="submit"]').click();
  });

  it('should submit the self-assessment form', () => {
    cy.visit("http://localhost:8081/member/quiz");
    cy.contains('Psychological Self-Assessment').should('be.visible');
    cy.get('select[name="question1"]').select('sometimes');
    cy.get('select[name="question2"]').select('often');
    cy.get('select[name="question3"]').select('always');
    cy.get('select[name="question4"]').select('sometimes');
    cy.get('select[name="question5"]').select('often');
    cy.get('select[name="question6"]').select('always');
    cy.get('select[name="question7"]').select('not-at-all');
    cy.get('button[name="ass_submit"]').click();
  });
});


describe('Psychological Self-Assessment Application - Dashboard Page', () => {
  // beforeEach(() => {
  //     // Log in before each test
  //   // Run this code before each test case
  //   cy.visit("http://localhost:8081/auth/login/");
  //   cy.get('input[name="email"]').type('test1@test.com');
  //   cy.get('input[name="password"]').type('12345678');
  //   cy.get('button[type="submit"]').click();
  //   cy.visit('http://localhost:8081/member/dashboard'); // Visit the dashboard page before each test
  // });
  /*
    it('displays user information based on role', () => {
      // Assertion: Check if user information is displayed correctly
      cy.get('h1').should('contain', 'Welcome, test1!'); // Assuming the username is 'testuser'
      cy.get('p').contains('Email:').should('contain', 'test1@test.com'); // Assuming the email is 'test@example.com'
      cy.get('p').contains('Role:').should('contain', 'Member'); // Assuming the role is 'Member'
    });

    // Test cases for Member role
    context('Member Role', () => {
      beforeEach(() => {
        // Log in as a member
        // Cypress commands to log in as a member...
      });

      it('displays member-specific details', () => {
        // Assertion: Check if member-specific details are displayed correctly
        cy.get('.member-details').should('exist'); // Assuming there are member-specific details
        cy.get('.member-details').contains('Your Sessions').should('exist'); // Assuming there are sessions for the member
        cy.get('.member-details').contains('Your Enrolled Courses').should('exist'); // Assuming there are enrolled courses for the member
      });
    });
  */
  // Test cases for Admin role

});

/*
describe("admin ", ()=>{
  context('Admin Role', () => {

    it('displays admin-specific details', () => {
      // Assertion: Check if admin-specific details are displayed correctly
      cy.visit("http://localhost:8081/auth/login/");
      cy.get('input[name="email"]').type('adminuser@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('select[name="role"]').select('Admin');
      cy.get('button[type="submit"]').click();

      cy.get('.admin-details').should('exist'); // Assuming there are admin-specific details
      cy.get('.admin-details').contains('All Doctors').should('exist'); // Assuming there are doctors listed
      cy.get('.admin-details').contains('All Members').should('exist'); // Assuming there are members listed
      cy.get('.admin-details').contains('All Courses').should('exist'); // Assuming there are courses listed
      cy.get('.admin-details').contains('All Sessions').should('exist'); // Assuming there are sessions listed
      cy.get('.admin-details').contains('All Certifications').should('exist'); // Assuming there are certifications listed
      cy.get('button[name="logout"]').click();
    });


  });

})*/

/*
describe('FreshMind Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081'); // Adjust the URL as per your application's URL
  });

  it('displays the hero section with correct text', () => {
    cy.get('.hero').should('be.visible');
    cy.get('.hero-text h1').should('contain', 'Welcome to FreshMind');
    cy.get('.hero-text p').should('contain', 'Your Compassionate Guide to Mental Well-being');
  });

  it('displays the mission section with correct content', () => {
    cy.get('.mission').should('be.visible');
    cy.get('.mission h2').should('contain', 'Our Mission');
    cy.get('.mission p').should('contain', 'Empowering university students to thrive');
  });

  it('provides a link to visit online resources', () => {
    cy.get('.online-resources-references').should('be.visible');
    cy.get('.online-resources-references a.visit-now-button').should('have.attr', 'href', '/auth/login');
  });

  it('displays the therapy sessions section with correct content', () => {
    cy.get('.Sessions').should('be.visible');
    cy.get('.Sessions h2').should('contain', 'Therapy Sessions');
    cy.get('.Sessions p').should('contain', "Don't worry if online courses and resources aren't making you feel better");
  });

  it('provides a link to book therapy sessions', () => {
    cy.get('.Sessions').should('be.visible');
    cy.get('.Sessions a.book-session-button').should('have.attr', 'href', '/auth/login');
  });

  it('displays the join us section with correct content', () => {
    cy.get('.join-us').should('be.visible');
    cy.get('.join-us h2').should('contain', 'Join Us');
    cy.get('.join-us p').should('contain', 'Ready to embark on a transformative journey');
  });

  it('provides a link to create an account', () => {
    cy.get('.join-us').should('be.visible');
    cy.get('.join-us a.join-button').should('have.attr', 'href', '/auth/signup');
  });
});
*/

/*
describe('Feedback Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081/feedback'); // Adjust the URL as per your application's URL
  });

  it('displays the feedback form with correct elements', () => {
    cy.get('.feedback-content').should('be.visible');
    cy.get('.feedback-content h1').should('contain', 'Feedback');
    cy.get('.feedback-content p').should('contain', 'Your feedback is important to us.');

    cy.get('#name').should('exist').and('be.visible').and('have.attr', 'required');
    cy.get('#email').should('exist').and('be.visible').and('have.attr', 'required');
    cy.get('#rating').should('exist').and('be.visible').and('have.attr', 'required');
    cy.get('#comments').should('exist').and('be.visible').and('have.attr', 'required');

    cy.get('.submit-button').should('exist').and('be.visible').and('have.attr', 'type', 'submit');
  });

  it('allows users to submit feedback', () => {
    // Fill out the feedback form
    cy.get('#name').type('John Doe');
    cy.get('#email').type('john@example.com');
    cy.get('#rating').select('5 Stars');
    cy.get('#comments').type('This is a test feedback message.');

    // Submit the form
    cy.get('.submit-button').click();

  });

  it('requires all fields to be filled before submitting', () => {
    // Submit the form without filling out any fields
    cy.get('.submit-button').click();

    // Check if error messages are displayed for all required fields
    cy.contains('Your feedback is important to us. Please share your thoughts and suggestions to help us improve our services.').should('be.visible');
    cy.contains('Your feedback is important to us. Please share your thoughts and suggestions to help us improve our services.').should('be.visible');
    cy.contains('Your feedback is important to us. Please share your thoughts and suggestions to help us improve our services.').should('be.visible');
    cy.contains('Your feedback is important to us. Please share your thoughts and suggestions to help us improve our services.').should('be.visible');
  });
});
*/


// describe('Session Booking Page', () => {
//   beforeEach(() => {
//     // Assuming you navigate to the session booking page
//     cy.visit("http://localhost:8081/auth/login/");
//     cy.get('input[name="email"]').type('test1@test.com');
//     cy.get('input[name="password"]').type('12345678');
//     cy.get('button[type="submit"]').click();
//     cy.visit('http://localhost:8081/member/sessions/'); // Update URL as needed
//   });

//   it('displays the session booking page with correct elements', () => {
//     cy.get('.sessions-container').should('be.visible');
//     cy.get('.sessions-container h1').should('contain', 'Your Sessions');

//     // Ensure sessions are rendered properly
//     cy.get('.section').should('have.length.gt', 0);

//     // If user is a member, ensure "Add" buttons are present
//     cy.get('.section').each(($section) => {
//       if ($section.find('form').length > 0) {
//         cy.wrap($section).find('form button').should('contain', 'Add');
//       }

//     });
//     cy.get('button[name="logout"]').click();
//     });

// });
