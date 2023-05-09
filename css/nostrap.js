import { css } from 'https://cdn.jsdelivr.net/npm/lit@2/+esm'

/* 
trying to keep consistent with: https://getbootstrap.com/docs/5.0/utilities/spacing/#margin-and-padding
 */
export const nostrap = css`
          .mobile {
               /* display: none; */
          }

.flexr {
    display: flex;
  }
          @media screen and (max-width: 767px) {
               /* Use this to hide and show elements for desktop vs mobile */
               /* .mobile {
                    display: block;
               } */

               .desktop {
                    display: none;
               }

               .flexr {
                    /* for flex reponsive */
                    flex-direction: column;
               }
          }

          @media screen and (min-width: 768px) {
               /* Use this to hide and show elements for desktop vs mobile */
               .mobile {
                    display: none;
               }

               .desktop {
                    display: unset;
               }

               .flexr {
                    /* for flex reponsive */
                    flex-direction: row;
               }
          }
          
    .flex {
    display: flex;
  }
  .flexw {
    display: flex;
    flex-wrap: wrap;
  }
    .flexc {
     display: flex;
     align-items: center;
     justify-content: center;
   }

    .mt-3 {
        margin-top: 1rem;
    }
    .mb-1 {
          margin-bottom: 0.25rem;
    }
    .mb-2 {
        margin-bottom: 0.5rem;
   }
   .mb-3 {
        margin-bottom: 1rem;
   }
   .mb-4 {
        margin-bottom: 1.5rem;
   }
   .mb-5{
           margin-bottom: 3rem;
   }
   .pt-1 {
      padding-top: 0.25rem;
   }
   .pt-2 {
      padding-top: 0.5rem;
   }
   .pt-3 {
        padding-top: 1rem;
   }
   .pb-3 {
        padding-bottom: 1rem;
   }
    .p-1 {
    padding: 0.25rem;
  }
  .p-2 {
    padding: 0.5rem;
  }
  .p-3 {
    padding: 1rem;
  }
  .p-4 {
    padding: 1.5rem;
  }
     
   .fw {
        width: 100%;
   }
   
          .small { /* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small#css_alternative */
               font-size: 0.8em;
          }

    `
