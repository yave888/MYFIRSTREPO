function sendSlackNotification() {
 
 
    let searchString = 'in:inbox subject:"エンタープライズサポート　アクティベーション依頼" "ご依頼いただきましたメンバーアカウントのエンタープライズサポートへの有効化手続きが完了いたしました。"';
    let threads = GmailApp.search(searchString);
    console.log(threads)
    let spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    const JIRASheet = spreadSheet.getSheetByName("JIRA");
    let mailSheet = spreadSheet.getSheetByName("mail");
    let data = mailSheet.getDataRange().getValues();
    let notifiedSubjects = data.map(function(row) { return row[0]; }); // 通知済みメールの件名を取得
  
    if (threads.length > 0) {
      let QUERY = "status not in (クローズ, 解決済み, 完了) AND project = 社内サポート AND text ~ 'AWS初期設定依頼' AND 'Request Type' = '【SKY-OPT】AWS初期設定依頼 (INTERSUP)' AND created >= -12d ORDER BY created DESC"
      const FIELD = "issuekey";
  
      // シートを一度クリア
      JIRASheet.clear();
  
      // JIRAからチケットの情報をスプレッドシートへ貼り付け
      JIRASheet.getRange("A1").setValue('=JIRA("' + QUERY + '","' + FIELD + '")');
  
      let LastRow = JIRASheet.getLastRow();
      console.log(LastRow); // コンソールログに変更
  
      if (LastRow > 1) {
        let temp = JIRASheet.getRange("A2:A" + LastRow).getValues();
        Logger.log(temp); // コンソールログに変更
  
        let columnAValues = temp.map(function(row) {
          return row[0];
        });
  
        Logger.log(columnAValues); // コンソールログに変更
  
        let formattedValues = [];
        columnAValues.forEach(element => {
          let formattedValue = "https://skyarchjsm.atlassian.net/browse/" + element + "\n\n";
          formattedValues.push(formattedValue);
        });
  
        let subject = GmailApp.getMessagesForThreads(threads)[0][1].getSubject();
        if (notifiedSubjects.indexOf(subject) === -1) { // 通知済みでなければSlackに通知
          let message = "▼以下の件名のメールが届いています。\n\n" + subject + "\n\n" + "\n\n" + "▼対象のチケットはこちらかも\n\n" + formattedValues;
          let slackUrl = "https://hooks.slack.com/services/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";
          let payload = {
            "text": message
          };
          let options = {
            "method": "post",
            "payload": JSON.stringify(payload)
          };
          UrlFetchApp.fetch(slackUrl, options);
          mailSheet.appendRow([subject, new Date()]); // 通知したメールの件名と日時を記録
        }
      }
    }
  }