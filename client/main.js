// $( function() {
//   $('.closeable').on('click', function(e) {
//     /* Order of operations, have to set height style before removing close class */
//     if (!$(this).hasClass('cl') && e.target.className.includes('close-button')) {
//       $(this).height('');
//       $(this).toggleClass('cl');
//       $(this).toggleClass('active');
//     }
//     else if($(this).hasClass('cl') && e.target.className.includes('close-button')) {
//       $(this).height($(this).attr('data-height'));
//       $(this).toggleClass('cl');
//       $(this).toggleClass('active');
//     }

//   }).height('auto').each(function() {
//     $(this).attr('data-height', $(this).height());
//   }).height('');
// });
