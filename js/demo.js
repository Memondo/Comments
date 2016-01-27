var HIGH_SCORE = 20;
var LOW_SCORE = -20;

$('.comment-list')
    .on('click', '.btn-show-replies', function() {
    
        var $commentList = $(this).parents('.comment-list');
        var $comment = $(this).parents('.comment');
        var $children = $commentList.find('.comment[data-parent="' + $comment.data('id') + '"]').clone();
        
        $comment.after(new Spinner());
        
        setTimeout(function() { // Emulate request delay to show the spinner
            
            $comment.next('.comments-spinner').remove();
            $comment.after(
                $('<li class="nested-comments">').append($children)
            );
            
        }, 1200);
    
    })
    .on('click', '.btn-score-up', function() {
    
        var $comment = $(this).parents('.comment');
        var $score = $(this).siblings('.num');
        var num = parseInt($score.text());
        
        $score.text(++num);
    
        if (num >= HIGH_SCORE) $comment.addClass('high');
        if (num > LOW_SCORE) $comment.removeClass('low');
    
    })
    .on('click', '.btn-score-down', function() {
    
        var $comment = $(this).parents('.comment');
        var $score = $(this).siblings('.num');
        var num = parseInt($score.text());
        
        $score.text(--num);
    
        if (num <= LOW_SCORE) $comment.addClass('low');
        if (num < HIGH_SCORE) $comment.removeClass('high');
    
    }).on('click', '.new-comment .anonymous-user .btn', function(e) {
    
        var $newComment = $(this).parents('.new-comment');
        var nextCommentId = parseInt($newComment.parents('.comment-list').data('next-comment'));
        var parentId = $newComment.parents('.comment').length ? parseInt($(this).parents('.comment').data('id')) : 0;
        
        e.preventDefault();
        
        $newComment.addClass('showing-form');
        $newComment.data('parent', parentId);
        $newComment.find('.comment-id').text('#' + nextCommentId);
        $newComment.find('.comment-date').text('on ' + getCurrentDate());
        $newComment.find('textarea').focus();
    
    }).on('click', '.btn-reply', function(e) {
    
        var $parentComment = $(this).parents('.comment');
        var $newComment = $(this).parents('.comment-list').find('.new-comment:last').clone();
        
        e.preventDefault();
    
        $parentComment.after(
            $('<li class="nested-comments">').append($newComment)
        );
    
    });

Number.prototype.pad = function(len) {
    
    return (new Array(len + 1).join('0') + this).slice(-len);

}

function Spinner() {
    
    var $spinner = $('<div class="comments-spinner"><div class="ball"></div></div>');

    return $spinner.clone();
    
}

function getCurrentDate() {
    
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var d = new Date();
    
    return monthNames[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() + ' at ' + d.getHours().pad(2) + ':' + d.getMinutes().pad(2);
    
}